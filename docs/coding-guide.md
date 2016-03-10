#Project Coding Guide

**What certain things mean**


##index.js
- Manages composition for components at that level of hierarchy
- Wraps any components in containers for that level of hierarchy

##Components
**Contains the actual UI rendering code**
- The only state variables in presentational components are related to UI state, not the underlying state tree or data model for the application.


##Containers
- Data Fetching from state tree, or AJAX calls.
- Querying state tree, data massaging
- Injecting data into components by acting as a wrapper/higher-order component