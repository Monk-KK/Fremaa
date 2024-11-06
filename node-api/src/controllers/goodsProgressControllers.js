import { GoodsProgress } from "../mongoSchemas/goodsProgress.schema.js";

// Remove ensureCollectionExists since Mongoose handles collection creation automatically

// Get all goods progress
export const getGoodsProgress = async (req, res) => {
  console.log("Fetching Data From GoodsProgress Collection...");
  try {
    const goodsProgress = await GoodsProgress.find();
    res.json(goodsProgress);
    console.log(
      "Fetched GoodsProgress data........",
      JSON.stringify(goodsProgress, null, 2)
    );
  } catch (error) {
    res.status(500).json({ message: "Error fetching goods progress", error });
    console.log("Fetch Error from MongoDB...");
  }
};

// Post new goods progress
export const postGoodsProgress = async (req, res) => {
  try {
    const { progressDetails, ...restData } = req.body;
    console.log(
      "POSTING ...... GoodsProgress data........",
      JSON.stringify(progressDetails, null, 2)
    );

    if (!Array.isArray(progressDetails) || progressDetails.length === 0) {
      return res
        .status(400)
        .json({ message: "Progress details are required." });
    }

    const lastDetail = progressDetails[progressDetails.length - 1];
    const previousProgress = lastDetail ? lastDetail.totalProgress : 0;

    const newGoodsProgress = new GoodsProgress({
      ...restData,
      previousProgress,
      progressDetails,
    });
    await newGoodsProgress.save();
    res.status(201).json(newGoodsProgress);
  } catch (error) {
    res.status(500).json({ message: "Error saving goods progress", error });
  }
};

// Update goods progress by ID
export const updateGoodsProgress = async (req, res) => {
  try {
    const goodsProgress = await GoodsProgress.findById(req.params.id);
    if (!goodsProgress) {
      return res.status(404).json({ message: "Goods Progress not found" });
    }

    const { progressDetails, ...restData } = req.body;

    const lastDetail =
      goodsProgress.progressDetails[goodsProgress.progressDetails.length - 1];
    const previousProgress = lastDetail
      ? lastDetail.totalProgress
      : goodsProgress.previousProgress;

    const updatedGoodsProgress = await GoodsProgress.findByIdAndUpdate(
      req.params.id,
      { ...restData, previousProgress, progressDetails },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedGoodsProgress);
  } catch (error) {
    res.status(500).json({ message: "Error updating goods progress", error });
  }
};

// Aggregated Progress by Zone, Lot, and Items
export const getProgressAnalytics = async (req, res) => {
  const { startDate, endDate } = req.query;

  // Ensure proper date parsing and validation
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Both startDate and endDate are required." });
  }

  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);

  try {
    const result = await GoodsProgress.aggregate([
      { $unwind: "$zones" }, // Unwind zones
      { $unwind: "$zones.lots" }, // Unwind lots within each zone
      { $unwind: "$zones.lots.progressDetails" }, // Unwind progress details

      // Match progress details that fall between the given date range
      {
        $match: {
          "zones.lots.progressDetails.progressDetailsEnd": {
            $gte: new Date(startDate).toISOString(),
            $lte: new Date(endDate).toISOString(),
          },
        },
      },

      // Group by zone, lot, and item to accumulate the latest progress details
      {
        $group: {
          _id: {
            zone: "$zones.zone",
            lot: "$zones.lots.lot",
            item: "$zones.lots.progressDetails.item",
          },
          progressDetails: {
            $last: {
              item: "$zones.lots.progressDetails.item",
              progressDetailsStart:
                "$zones.lots.progressDetails.progressDetailsStart",
              progressDetailsEnd:
                "$zones.lots.progressDetails.progressDetailsEnd",
              totalProgress: "$zones.lots.progressDetails.totalProgress",
              physicalProgressPercentage:
                "$zones.lots.progressDetails.physicalProgressPercentage",
              financialProgressPercentage:
                "$zones.lots.progressDetails.financialProgressPercentage",
            },
          },
          lastPhysicalProgress: {
            $last: "$zones.lots.progressDetails.physicalProgressPercentage",
          },
          lastFinancialProgress: {
            $last: "$zones.lots.progressDetails.financialProgressPercentage",
          },
          lastQuantitySupplied: {
            $last: "$zones.lots.progressDetails.totalProgress",
          },
          lastFinancialUtilization: {
            $sum: {
              $multiply: [
                "$zones.lots.progressDetails.totalProgress",
                "$zones.lots.progressDetails.financialProgressPercentage",
              ],
            },
          },
          lastGeoBagsSupplied: {
            $sum: {
              $cond: [
                {
                  $eq: ["$zones.lots.progressDetails.item", "Geo-Textile Bags"],
                },
                "$zones.lots.progressDetails.totalProgress",
                0,
              ],
            },
          },
          lastFabricSupplied: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$zones.lots.progressDetails.item",
                    "Geo-Textile Fabric",
                  ],
                },
                "$zones.lots.progressDetails.totalProgress",
                0,
              ],
            },
          },
          lastSewingThreadSupplied: {
            $sum: {
              $cond: [
                { $eq: ["$zones.lots.progressDetails.item", "Sewing Threads"] },
                "$zones.lots.progressDetails.totalProgress",
                0,
              ],
            },
          },
        },
      },

      // Group by zone and lot to collect all items within the lot
      {
        $group: {
          _id: {
            zone: "$_id.zone",
            lot: "$_id.lot",
          },
          progressDetails: {
            $push: "$progressDetails", // Accumulate progress details
          },
          totalPhysicalProgress: { $avg: "$lastPhysicalProgress" },
          totalFinancialProgress: { $avg: "$lastFinancialProgress" },
          lotPhysicalProgress: {
            $avg: "$lastlPhysicalProgress", // Calculate average progress across the zone
          },
          lotFinancialProgress: {
            $avg: "$lastFinancialProgress", // Calculate average progress across the zone
          },
          lotFinancialUtilization: {
            $sum: "$lastFinancialUtilization",
          },
          lotGeoBagsSupplied: {
            $sum: "$lastGeoBagsSupplied",
          },
          lotFabricSupplied: {
            $sum: "$lastFabricSupplied",
          },
          lotSewingThreadSupplied: {
            $sum: "$lastSewingThreadSupplied",
          },
        },
      },

      // Group by zone to get lots and calculate overall zone progress
      {
        $group: {
          _id: "$_id.zone",
          lots: {
            $push: {
              lot: "$_id.lot",
              totalPhysicalProgress: "$lotPhysicalProgress",
              totalFinancialProgress: "$lotFinancialProgress",
              progressDetails: "$progressDetails",
            },
          },
          zonePhysicalProgress: {
            $avg: "$totalPhysicalProgress", // Calculate average progress across the zone
          },
          zoneFinancialProgress: {
            $avg: "$totalFinancialProgress", // Calculate average progress across the zone
          },
          totalFinancialUtilization: {
            $sum: "$lotFinancialUtilization",
          },
          totalGeoBagsSupplied: {
            $sum: "$lotGeoBagsSupplied",
          },
          totalFabricSupplied: {
            $sum: "$lotFabricSupplied",
          },
          totalSewingThreadSupplied: {
            $sum: "$lotSewingThreadSupplied",
          },
        },
      },

      // Sort the zones if needed (e.g., by physical progress)
      {
        $sort: { zonePhysicalProgress: -1 },
      },
    ]);

    console.log(
      "Analytics Data GoodsProgress ........",
      JSON.stringify(result, null, 2)
    );

    res.json(result);
  } catch (error) {
    console.error("Error during aggregation:", error);
    res.status(500).json({ error: "Server error during aggregation" });
  }
};

// Get goods progress by ID
export const getGoodsProgressById = async (req, res) => {
  try {
    const goodsProgress = await GoodsProgress.findById(req.params.id);
    if (!goodsProgress) {
      return res.status(404).json({ message: "Goods Progress not found" });
    }
    res.status(200).json(goodsProgress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching goods progress", error });
  }
};

// Delete goods progress by ID
export const deleteGoodsProgress = async (req, res) => {
  try {
    const deletedGoodsProgress = await GoodsProgress.findByIdAndDelete(
      req.params.id
    );
    if (!deletedGoodsProgress) {
      return res.status(404).json({ message: "Goods Progress not found" });
    }
    res.status(200).json({ message: "Goods Progress deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting goods progress", error });
  }
};

// Get progress by Zone and Lot
export const getProgressByZoneAndLot = async (req, res) => {
  const { zone } = req.params;
  try {
    const result = await GoodsProgress.aggregate([
      { $match: { zone } },
      { $unwind: "$lots.progressDetails" },
      {
        $group: {
          _id: "$lots.lot",
          totalPhysicalProgress: {
            $sum: "$lots.progressDetails.physicalProgressPercentage",
          },
          totalFinancialProgress: {
            $sum: "$lots.progressDetails.financialProgressPercentage",
          },
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error during aggregation" });
  }
};
