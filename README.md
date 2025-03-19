## Prerequisites

For your local development you need to have `Node.js` and `npm` version 16 or above installed and a registered MongoDB collection:

- For Windows: https://phoenixnap.com/kb/install-node-js-npm-on-windows
- Linux & Mac: https://updivision.com/blog/post/

## ExpressJS API Backend Installation

To install the project you need to have version 16 of Node.js and npm version 8. The first step is to run `npm install` command. Next you need to copy the `.env.example` file and name it `.env`. There are the variables for the database and the URLs:

- DB_LINK="mongodb-link-to-connect"

- JWT_SECRET="token"

- APP_URL_CLIENT= with the default value of http://localhost:3000
- APP_URL_API= with the default value of http://localhost:8080

## Material React Frontend Installation

1. Set up your api for the project
2. Download and Install NodeJs LTS version from [NodeJs Official Page](https://nodejs.org/en/download/).
3. Navigate to the root ./ directory of the product and run `yarn install` or `npm install` to install our local dependencies.
4. Add in your projeact an .env file with the variables

- `REACT_APP_URL=your-react-project`
- `REACT_APP_API_URL=the-path-of-the-api`
- `REACT_APP_IS_DEMO=false` if you don't want any restrictions and true if you want

5. In `package.json` in the `proxy` variable add the right path to your API
6. Run `yarn start` or `npm start`

## Documentation

## Login

If a user is not logged in can access only the authentication pages: Login, Register and Forgot Password. By default, there **admin@jsonapi.com** with password **secret** as credentials.
For authentication context and protected routes were used to keep track of the state of the users. Axios together with an http service and helped by an auth service and crud service handled the requests. The **/src/service** keeps the logic of the services while **/src/context** has the logic for the different contexts used, including the authentication context.

In the **/src/auth/login/index.js** is the logic for logging in an existing user:

```
    try {
      const response = await AuthService.login(myData);
      authContext.login(response.access_token, response.refresh_token);
    } catch (res) {
      if (res.hasOwnProperty("message")) {
        setCredentialsError(res.message);
      } else {
        setCredentialsError(res.errors[0].detail);
      }
    }
```

## Register

It can be added a new user by registration. The user has a name, email, password and role that needs to be added. All the inputs are verified and validated. You can simply access the page with the **Sign up** button or adding **/register** in the url.

In the **/src/auth/register/index.js** is the logic for signing up a new user:

```
    const response = await AuthService.register(myData);

    authContext.login(response.access_token, response.refresh_token);
```

## Forgot Password

In case of forgetting its password, the user can go to a page where he adds the email of the account and an email will be send to that address to help with resetting the password. It can be accessed from the Login page by clicking the **here** button or by adding **/forgot-password**.

In the **/src/auth/forgot-password/index.js** is the logic for requesting a password reset:

```
    try {
      const response = await authService.forgotPassword(myData);
      if (error === false) {
        setNotification(true);
      }
    } catch (err) {
      console.error(err);
      return null;
    }
```

## Reset Password

For resetting the password, the user must acceess the url sent int the email. By adding the new password and the confirmation and then pressing the **channge** button the data of the account is updated. You can go back to login from the button in notification.

In the **/src/auth/reset-password/index.js** is the logic for resetting the password:

```
  useEffect(() => {
    // get the token and email sent in the url
    const queryParams = new URLSearchParams(window.location.search);
    setToken(queryParams.get("token"));
    setEmail(queryParams.get("email"));
  }, []);
```

## User Profile

From the sidenav, in the CRUDs section, or by adding **/cruds/user-profile** in the url, the User Profile is a dynamic page where the user can add details about him: profile image, name, email or change password. Validation is added for every input.

In the **/src/services/auth-serivce** you can find the routes sets for the request and in the **/src/cruds/user-profile** is the component for the editing the profile details.

```
  getProfile = async() => {
    const getProfile = 'me';
    return await HttpService.get(getProfile);
  }

  updateProfile = async (newInfo) => {
    const updateProfile = "me";
    return await HttpService.patch(updateProfile, newInfo);
  }
```

## Browser Support

Microsoft Edge, Chrome

## Useful Links
