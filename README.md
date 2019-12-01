

![Logo](https://github.com/SlantedTable/Warranty/blob/master/logo.png)

# Warranty Countdown

## Release Notes
New software features for this release
- Add a warranty
    - Select an image of warranty item
    - Input item’s warranty information into a form
    - Upload Item’s warranty information to a remote database
- Delete a warranty
    - Remove an item’s warranty information from the database
- Update a Warranty
    - Update an item’s warranty information in the database
- Register a new account
    - Adds a new account with information such as username and password for login to the database 
- Login to application
    - Allows a user to use a registered account to login to the application 
- View profile information
    - Allows a user to view their profile’s information from within the application

### Bug fixes made since the last release 
- Fixed Delete warranty
    - Delete warranty would not update in the database
- Fixed back button
    - The back button would not show up on IOS devices but will show up on Android devices

## Known bugs and defects
- If two users create a warranty at the exact same time the image in the item’s form will have the same ID
- As of now, when a warranty is updated the old one is deleted and a new one with 


## Installation Instructions

#### Pre-requisites:
- Git
- NodeJS
- Expo Client Tool
- React
- Computer running MacOS or Windows

#### Dependent Libraries:
- react
- react-native
- Expo
- Etag
- Debug
- Core-utils-is
- Babel
- Amazon-cognito identity
- aws-amplify

### How to install and run the application

1. Download NodeJS and Git
- Install NodeJS for on your machine from the following link: https://nodejs.org/en/
- Install Git on your machine from the following link: https://git-scm.com/downloads
- Install the expo client tool for command line
    - Open your command line and type in the following command: npm install expo-cli --global

2. Clone the project
- Open your command line
- type: `cd Desktop`
- type: `git clone https://github.com/SlantedTable/Warranty/`

3.Download expo for your mobile device
- On your phone's app store download the Expo App

4. Running the Application
- Open your command line
- type: `cd Desktop`
- type: `cd Warranty`
- type: `expo start`
- A new window will have opened. Open the Expo App on your phone and scan the QR code.

## Troubleshooting

If you run into an issue with the application, close the application and clear it from your recently used application
If you continue to run into an issue with the application, please send a detailed email to `warrantycountdown@gmail.com`


