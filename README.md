# **CodeSync AI**

A cutting-edge platform for **real-time collaboration** and **AI-powered assistance** in software development. CodeSync AI is designed to empower developers to work together seamlessly, interact with AI for code generation and problem-solving, and execute code directly in the browser using containerized environments.

---

## **Features**

### **1. Real-Time Chat and Collaboration**
- **Instant Messaging**: Collaborate with your team through real-time chat. Share ideas, discuss implementations, and troubleshoot problems.  
- **Live Collaboration**: Edit and manage code simultaneously with your team. Changes appear in real-time, keeping everyone on the same page.

### **2. AI Integration (@AI Feature)**
- **Intelligent Responses**: Ask AI any programming-related question in the chat. The AI provides concise and accurate answers in the chat interface.  
- **Code Assistance**: When prompted for code (e.g., *"Create an Express server"*), the AI generates the code and opens it inside a file within the workspace. This feature simplifies development by automating repetitive coding tasks.

### **3. In-Browser Code Execution**
- **Containerized Environments**: Run your code directly in the browser using containers. No need to set up a local environment or worry about compatibility issues.  
- **Multi-Language Support**: Execute code in multiple programming languages, ensuring flexibility for various project requirements.  
- **Error Reporting**: Get real-time feedback on errors and debugging hints for seamless testing and development.

---

## **How It Works**

1. **Collaborate**: Users join a shared workspace where they can chat and code together in real time.  
2. **Ask the AI**: Use the `@AI` feature in the chat to request explanations, solutions, or code snippets.  
3. **Run Code**: Execute the generated or manually written code in a secure containerized environment accessible directly in the browser.

---

## **Technologies Used**

- **Frontend**: React, Tailwind CSS, WebSockets for real-time updates.  
- **Backend**: Node.js, Express, WebSocket server for communication, and AI integration with OpenAI API.  
- **Containerization**: StackBlitz Web Containers for creating isolated, browser-based environments to run user code seamlessly.  
- **Database**: MongoDB for managing users, chats, and files.  
- **Authentication**: JWT for secure user authentication.

---

## **Use Cases**

- **Team Collaboration**: Perfect for remote teams collaborating on software projects.  
- **AI-Assisted Development**: Accelerate your workflow by leveraging AI to generate boilerplate code or solve specific coding challenges.  
- **Education**: A great tool for coding bootcamps and collaborative learning sessions.

---

## **Future Enhancements**

- **Version Control Integration**: Seamless integration with GitHub for managing code versions.  
- **Custom AI Models**: Support for training custom models to adapt to specific team or project requirements.  
- **Code Review Automation**: AI-powered code reviews for enhanced code quality.

---

## **Getting Started**

### **Prerequisites**
Ensure that you have Node.js installed on your machine.

### **Installation**

1. **Clone the Repository**:
   git clone https://github.com/anujchauhann09/code-sync-ai.git
   cd code-sync-ai
2. **Set up the backend**:
   cd backend
   npm install
3. **Set up the frontend**:
   cd ../frontend
   npm install
4. **Run the project**:
   npm run start
