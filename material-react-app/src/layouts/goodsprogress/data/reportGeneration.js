import jsPDF from "jspdf";
import "jspdf-autotable";
import { Chart, registerables } from "chart.js";
const doc = new jsPDF();
let currentY = 40;

Chart.register(...registerables); // Register Chart.js components

// Helper function to format currency
const formatCurrency = (value) => `₹ ${value.toLocaleString()}`;

// Function to calculate totals and averages
const calculateTotals = (zonesData) => {
  let totals = {
    physicalProgress: 0,
    financialProgress: 0,
    geoBags: 0,
    fabricSheets: 0,
    sewingThreads: 0,
    contractValue: 0,
  };

  zonesData.forEach((zone) => {
    if (zone.lots && Array.isArray(zone.lots)) {
      zone.lots.forEach((lot) => {
        totals.contractValue += lot.contractValue || 0;

        if (lot.progressDetails && Array.isArray(lot.progressDetails)) {
          lot.progressDetails.forEach((item) => {
            if (item.item === "Geo-Textile Bags") {
              totals.geoBags += item.totalProgress || 0;
            } else if (item.item === "Geo-Textile Fabric") {
              totals.fabricSheets += item.totalProgress || 0;
            } else if (item.item === "Sewing Threads") {
              totals.sewingThreads += item.totalProgress || 0;
            }
          });
        }
      });
    }
    totals.physicalProgress += zone.zonePhysicalProgress || 0;
    totals.financialProgress += zone.zoneFinancialProgress || 0;
  });

  totals.averagePhysicalProgress = (
    totals.physicalProgress / zonesData.length
  ).toFixed(2);
  totals.averageFinancialProgress = (
    totals.financialProgress / zonesData.length
  ).toFixed(2);

  return totals;
};

// ========================
// 3. Lots per Zone with Lot Charts
// ========================
const generateLotChartsForZone = (lot, zoneName, resolve, reject) => {
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 250;
  const ctx = canvas.getContext("2d");

  const items = ["Geo-Textile Bags", "Geo-Textile Fabric", "Sewing Threads"];
  const progressData = items.map((item) => {
    if (!lot.progressDetails || !Array.isArray(lot.progressDetails)) {
      console.error("progressDetails is missing or not an array for lot:", lot);
      return 0;
    }
    const progressDetail = lot.progressDetails.find(
      (detail) => detail.item === item
    );
    return progressDetail ? progressDetail.totalProgress || 0 : 0;
  });

  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: items,
      datasets: [
        {
          label: `Total Progress for ${lot.lot || "Unnamed Lot"}`,
          data: progressData,
          backgroundColor: [
            "rgba(79, 129, 189, 0.7)", // Soft Blue
            "rgba(192, 80, 77, 0.7)", // Soft Red
            "rgba(155, 187, 89, 0.7)", // Soft Green
          ],
          borderColor: [
            "rgba(79, 129, 189, 1)",
            "rgba(192, 80, 77, 1)",
            "rgba(155, 187, 89, 1)",
          ],
          borderWidth: 1,
          borderRadius: 5,
          minBarLength: 5,
          barThickness: 25,
          maxBarThickness: 30,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Total Progress",
          },
          ticks: {
            stepSize: 10,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: `Progress of Items in ${lot.lot || "Unnamed Lot"} (${zoneName})`,
        },
        legend: {
          display: false,
        },
      },
      animation: {
        onComplete: () => {
          const chartImage = canvas.toDataURL("image/png");

          const img = new Image();
          img.onload = () => {
            try {
              const remainingSpace =
                doc.internal.pageSize.height - currentY - 20;
              if (remainingSpace < 90) {
                doc.addPage();
                currentY = 20;
              }

              doc.addImage(img, "PNG", 14, currentY, 180, 90);
              currentY += 100;
              chart.destroy();
              resolve();
            } catch (error) {
              console.error("Error adding image:", error);
              reject(error);
            }
          };
          img.onerror = (error) => {
            console.error("Error loading image:", error);
            reject(error);
          };
          img.src = chartImage;
        },
      },
    },
  });
};

// Main report generation function
const generateReport = async (zonesData, startDate, endDate) => {
  // const doc = new jsPDF();
  const totals = calculateTotals(zonesData);

  // Title Section
  doc
    .setFont("TimesNewRoman", "bold")
    .setFontSize(16)
    .text("Goods Progress Report", 14, 10);
  doc.setFont("helvetica", "normal").setFontSize(12);
  doc.text(`Start Date: ${new Date(startDate).toLocaleDateString()}`, 14, 20);
  doc.text(`End Date: ${new Date(endDate).toLocaleDateString()}`, 14, 30);

  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedEndDate = new Date(endDate).toLocaleDateString();

  // let currentY = 40;

  // Consolidated Summary
  doc
    .setFont("helvetica", "bold")
    .setFontSize(14)
    .text("Consolidated Summary of All Zones", 14, currentY);
  currentY += 10;
  const consolidatedData = [
    ["Average Physical Progress", `${totals.averagePhysicalProgress}%`],
    ["Average Financial Progress", `${totals.averageFinancialProgress}%`],
    ["Total Geo-Bags Supplied", totals.geoBags.toLocaleString()],
    ["Total Fabric Sheets Supplied", totals.fabricSheets.toLocaleString()],
    ["Total Sewing Threads Supplied", totals.sewingThreads.toLocaleString()],
    ["Total Lot-wise Contract Value", formatCurrency(totals.contractValue)],
  ];
  doc.autoTable({
    head: [["Metric", "Value"]],
    body: consolidatedData,
    startY: currentY,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
  });
  currentY = doc.previousAutoTable.finalY + 10;

  // Per Zone Summary
  doc
    .setFont("helvetica", "bold")
    .setFontSize(14)
    .text("Per Zone Summary", 14, currentY);
  currentY += 10;

  const zoneSummaryData = zonesData.map((zone) => {
    const geoBags = zone.totalGeoBagsSupplied || 0; // Handle potential undefined values
    const fabricSheets = zone.totalFabricSupplied || 0;
    const sewingThreads = zone.totalSewingThreadSupplied || 0;

    return [
      zone._id || "N/A",
      `${(zone.zonePhysicalProgress || 0).toFixed(2)}%`,
      `${(zone.zoneFinancialProgress || 0).toFixed(2)}%`,
      formatCurrency(
        (zone.zoneFinancialProgress * zone.zoneContractValue) / 100 || 0
      ),
      geoBags.toLocaleString(), // Use localString and handle undefined
      fabricSheets.toLocaleString(),
      sewingThreads.toLocaleString(),
      formatCurrency(zone.zoneContractValue || 0),
    ];
  });

  doc.autoTable({
    head: [
      [
        "Zone",
        "Physical Progress",
        "Financial Progress",
        "Financial Utilization",
        "Geo-Bags",
        "Fabric Sheets",
        "Sewing Threads",
        "Contract Value",
      ],
    ],
    body: zoneSummaryData,
    startY: currentY,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
  });
  currentY = doc.previousAutoTable.finalY + 10;

  for (const [zoneIndex, zone] of zonesData.entries()) {
    const { _id: zoneName, lots } = zone;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");

    // Check if there's enough space for the header (+ some margin)
    const headerHeight = 20;
    const remainingSpaceBeforeHeader =
      doc.internal.pageSize.height - currentY - 20;
    if (remainingSpaceBeforeHeader < headerHeight) {
      doc.addPage();
      currentY = 20;
    }

    // Zone Name Header
    doc.text(`${zoneName}:`, 14, currentY);
    currentY += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Goods", 14, currentY);
    currentY += 10;

    // Zone Summary Table
    const zoneSummary = {
      [`${zoneName} Progress: Goods (Up to ${formattedEndDate})`]: "",
      "Physical Progress": `${(zone.zonePhysicalProgress || 0).toFixed(2)} %`,
      "Financial Progress": `${(zone.zoneFinancialProgress || 0).toFixed(2)} %`,
      "Work Progress in terms of finance (in Rs.)": formatCurrency(
        (zone.zoneFinancialProgress * zone.zoneContractValue) / 100 || 0
      ),
      "Total nos. of Geo-bags (type - A) Supplied": (
        zone.totalGeoBagsSupplied || 0
      ).toLocaleString(),
      "Total Fabric sheet supplied (sqm)": (
        zone.totalFabricSupplied || 0
      ).toLocaleString(),
    };

    const tableData = Object.entries(zoneSummary).map(([key, value]) => [
      key,
      value,
    ]);

    doc.autoTable({
      head: [["", ""]],
      body: tableData,
      startY: currentY,
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [144, 238, 144], textColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [240, 248, 255] },
      columnStyles: { 0: { fontStyle: "bold" } },
    });

    currentY = doc.previousAutoTable.finalY + 10;

    if (!lots || !Array.isArray(lots)) {
      console.error(`Invalid 'lots' parameter for zone: ${zoneName}`);
      return;
    }

    // Generate Lot Charts
    try {
      for (const lot of lots) {
        // Lot Name Header
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(
          `${zoneName}: ${lot.lot || "Unnamed Lot"}: Supply of Goods`,
          14,
          currentY
        );
        currentY += 10;

        await new Promise((resolve, reject) => {
          generateLotChartsForZone(lot, zoneName, resolve, reject);
        });

        const remainingSpace = doc.internal.pageSize.height - currentY - 20;
        if (remainingSpace < 100) {
          doc.addPage();
          currentY = 20;
        }
      }
    } catch (error) {
      console.error("Error generating charts for zone:", zoneName, error);
    }

    // *Improved Page Break Logic:*
    const remainingSpace = doc.internal.pageSize.height - currentY - 20; // 20px margin
    if (remainingSpace < 100) {
      // Check if space is less than chart height
      doc.addPage();
      currentY = 20;
    }

    // Add page break if near bottom
    /* if (currentY > 240 && zoneIndex < zonesData.length - 1) {
      doc.addPage();
      currentY = 20;
    } */
  }

  // Footer with Page Numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, 180, 290);
  }

  // Save PDF
  doc.save("Goods_Progress_Report.pdf");
};

export default generateReport;
