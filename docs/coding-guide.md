#Project Coding Guide

**What certain things mean**


##index.js
- Manages composition for components at that level of hierarchy
- Wraps any components in containers for that level of hierarchy

##Components
**Contains the actual UI rendering code**
- Only state variables are using in UI


##Containers
- Data Fetching from state tree, or AJAX calls.
- Querying state tree, data massaging
- Injecting data into components by acting as a wrapper/higher-order component