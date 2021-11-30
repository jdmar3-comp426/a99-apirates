# Planning Documentation

Name: Scourge of the Seven Seas

Cookie Clicker - Pirate-Themed

Clicking does damage to some displayed enemy
    - Each click -> lowers enemy health

Killing enemy gives gold/doubloons

Leaderboard displaying top 5-10 scores
    - Populate with false info on initialization for realism
    - Display username, kill count, gold

Choose crew on account creation 
    - Indicated by logo on top corner
    - Crew leaderboard displayed alongside all-time leaderboard
    - One of two crews:
        - The Octopus Riders
        - The Giant Turtle Pillagers

Account Creation via Form:
    - Username: String
        - Detect if username already taken
    - Email Address: String
    - Password : String
    - Crew: String (Choose from drop-down)

Skill: 
    - Use gold to increase active damage or passive damage
    - Damage Upgrade
    - Passive Clicker
    - Passive Clicker Upgrades

Account Tracking Information:
    # Static
    - Username (Primary Key)
    - Email Address
    - Password
    - Crew

    # Dynamic
    - Gold Amount
    - Kill count
    - Upgrades

Front-End
    Pages:
    - Form for login and registration
    - Main App Page
    - Page/Dropdown (TBD) displaying account information and allowing account update/deletion
    NPM Packages:

Back-End
    Necessary API Endpoints:
        - GET request for verifying if user in DB & viewing information
        - POST request for user creation
        - PATCH request for updating gold amount, kill count, upgrades
        - PATCH request for account information update
        - DELETE request for account deletion

    NPM Packages:
        - Better-sqlite-3
        - Express.js
        - Node.js

Database:
    Database Name:
        - users
        Primary Key:
        - username
    Corresponding SQL entries to API Endpoints:
        - GET request for verifying if user in DB & viewing information -> SELECT
        - POST request for user creation -> INSERT
        - PATCH request for updating gold amount, kill count, upgrades -> UPDATE
        - PATCH request for account information update -> UPDATE
        - DELETE request for account deletion -> DELETE