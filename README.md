# TeamBangan_Construction_Equipment_Tracker
Word problem statement: 
A construction firm needs to track heavy equipment locations. 
The core modules include Equipment Logging and Site Assignment. The twist is using a Map API (or static map) to visualize where a machine is, with an audit log that records who "checked out" the keys.




1. Project Overview
•	System Name: EquipTrack Pro
•	Description: A professional-grade asset management platform designed to monitor heavy machinery locations and secure key handovers in real-time.
•	Problem Solved: Eliminates guesswork in construction logistics by providing a centralized hub for equipment tracking and a tamper-proof audit trail for keys.
•	Tech Stack: 
o	Frontend: React.js, Tailwind CSS, Vite
o	Backend: Java Spring Boot (MVC Pattern)
o	Database: MySQL
2. Team Members & Roles
Team Bangan
•	Raymark P. Pandita: Frontend Developer 
•	Virche T. Tautoan: Backend Developer 
•	Hector Josh G. Salera: QA / DevOps
3. System Features
•	Equipment Logging: CRUD functionality to register heavy machinery (Type, ID, Status).
•	Site Assignment: Module to geocode construction sites and assign machinery to specific locations.
•	Map Visualization: Powered by Leaflet.js, providing interactive markers that visualize machinery distribution.
•	Key Checkout Audit Log: An immutable ledger recording "Who, What, and When" for every physical key transaction.
4. Architecture & Database
•	ERD: [Link to your Mermaid diagram or insert screenshot here]
•	Table Relationships: * Users have a one-to-many relationship with AuditLogs.
o	Equipment belongs to one Site at a time.
o	AuditLogs link Users, Equipment, and Sites.
•	Use Case: A Site Manager logs in, selects a "Bulldozer," assigns it to "Site A," and the system automatically logs the key transfer and updates the map coordinates.
5. Security Features
•	RBAC Roles: * Admin: Full access to manage inventory,sites, and audit and view all logs.
o	Staff: Permissions to perform key check-outs/ins and view the live map.
•	Password Hashing: Implemented BCrypt for password hashing and secure REST communication.
•	Session Management: [e.g., JWT (JSON Web Tokens) or Secure Cookies] for stateful authentication.
•	Audit Log: Tracks User ID, Action (Checkout/Return), Equipment ID, and Timestamp (Immutable).
6. API Integrations
•	Leaflet.js API: Used for mapping and pin-point visualization of equipment. 
•	OpenWeather API: Integrated to monitor site conditions before deploying sensitive machinery.

7. How to Run the Project
•	Prerequisites: Node.js (v18+), JDK 17+, MySQL.
•	Installation Steps:
1.	Clone repo: git clone https://github.com/Hector143/TeamBangan_Construction_Equipment_Tracker.git
2.	Install dependencies: npm install or composer install
3.	Setup environment: cp .env.example .env
•	Start Server: 


Run Backend: ```bash cd backend ./mvnw spring-boot:run
Run Frontend: ```bash
cd frontend 
npm install
npm run dev

8. Git & Commit History
•	GitHub Repo: [Link]
•	Workflow: Workflow: We followed a Feature Branching workflow (e.g., feat/map, feat/auth) ensuring the main branch remained stable and deployment-ready at all times.
9. Known Limitations / Notes
•	GPS Updates: Locations are currently site-based manual geocodes; future builds will include live GPS hardware tracking. 
•	Scalability: The architecture is built to support multi-site operations with thousands of assets.
10. AI Utilization & System Integration
We leveraged AI to accelerate development and ensure high-quality code across the stack:
•	Frontend-Backend Bridge: Used AI to generate TypeScript interfaces based on Java models for type-safe API consumption.
•	Logic Optimization: AI helped optimize SQL queries for the Audit Log to prevent data redundancy and improved the responsiveness of the Tailwind layouts.
•	Git Management: AI was instrumental in resolving "divergent branch" errors and managing complex Git rebases.


FULL SCREENSHOTS OF THE SYSTEM:
LANDING PAGE
<img width="1898" height="991" alt="684978688_981825174238874_8798687709488648499_n" src="https://github.com/user-attachments/assets/39ff5067-a21e-48f5-bc02-38d237a1f11c" />



DASHBOARD
<img width="1915" height="996" alt="685231343_1280095970942694_4666483364469599974_n" src="https://github.com/user-attachments/assets/5b3c2850-353c-4b59-84f0-fa651464730d" />



EQUIPMENT
<img width="1908" height="983" alt="688240224_989130320429667_3967396712829107723_n" src="https://github.com/user-attachments/assets/e370f281-90bf-4a7b-91a5-cfa920072ac5" />




ACTIVITY LOGS
<img width="1919" height="978" alt="684946910_2565479763886399_3739203067619874583_n" src="https://github.com/user-attachments/assets/e4412b77-417d-42ca-afc3-20c3b38d0632" />




MAINTENANCE
<img width="1919" height="988" alt="689445928_2169385947152478_4492032472089450105_n" src="https://github.com/user-attachments/assets/3c2d1de6-6205-4be2-ac7b-a2ed4cf13d23" />
SCHEDULE MAINTENANCE

<img width="1910" height="1005" alt="685563571_977033341633671_3660195983336278660_n" src="https://github.com/user-attachments/assets/19d5357a-0015-4ced-bc11-71a011f2c00b" />


CREW MEMBERS
<img width="1919" height="991" alt="686209623_1518109409749361_4646300978796865032_n" src="https://github.com/user-attachments/assets/25e82394-d780-40ef-a002-19aad9874451" />

ADD NEW CREW MEMBER
<img width="1905" height="988" alt="687902097_4378523779063908_2553218674142032270_n" src="https://github.com/user-attachments/assets/facc11b0-ff7c-4e11-aea8-b02f0d32500f" />


SITES
<img width="1919" height="989" alt="690764872_1529716181907470_612009420421560383_n" src="https://github.com/user-attachments/assets/45537c87-15a0-4ef6-ae60-9e7480a41f61" />

ADD NEW CONSTRUCTION SITE
<img width="1919" height="978" alt="690651695_832492116581292_881744039246295255_n" src="https://github.com/user-attachments/assets/bb36616b-2618-4e88-9f8c-5ed38e4997ef" />



REPORTS
<img width="1919" height="997" alt="682774737_26718738081116554_1962620864322138145_n" src="https://github.com/user-attachments/assets/f21c3dc6-4247-4c98-a3cf-40994706fc0e" />



SETTINGS
<img width="1916" height="973" alt="686508458_27222725957319693_7336342250006521163_n" src="https://github.com/user-attachments/assets/b73c0720-41a2-4516-995e-e91381f79246" />




DATABASE ARCHITECTURE:
<img width="1024" height="559" alt="abb65cad-d55b-47f2-a612-4ea3bf07484e" src="https://github.com/user-attachments/assets/bdca0f05-2ad9-4718-b971-41d3a20a0ef1" />




