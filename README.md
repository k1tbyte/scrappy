# Scrappy

**Scrappy** is a desktop application built with **Electron.js** that provides an intuitive UI for web scraping. Designed to simplify the extraction of data from websites, Scrappy integrates **Selenium** for handling both static and dynamic content, including infinite scrolls and content loaders.

The core concept of Scrappy revolves around **pipelines**: sequences of actions that are executed step-by-step to automate data collection tasks.

---

## ✨ Features

- **Customizable Automation Scripts**  
  Create and manage your own automation scripts to scrape any kind of data from websites.

- **Dynamic Content Handling**  
  Supports dynamic loaders and infinite scrolling, ensuring complete data capture.

- **Pipeline Workflow**  
  Easily define a sequence of actions such as clicks, scrolls, waits, and data extraction to build efficient scraping pipelines.

- **Modern UI**  
  Built using **React** and **Vite**, Scrappy provides a fast and user-friendly interface for managing scraping tasks.

- **Cross-Platform**  
  Compatible with Windows, macOS, and Linux, thanks to the power of Electron.js.

---

## 🚀 Tech Stack

- **Frontend:** React, Vite
- **Backend Automation:** Selenium
- **Desktop Framework:** Electron.js

---

## 📖 Getting Started

Follow these steps to get started with Scrappy:

### 1. Clone the Repository
```bash
git clone https://github.com/k1tbyte/scrappy.git
cd scrappy
bun install
bun run dev
```
### 2. Define a pipeline
- Create a sequence of actions (e.g., scroll, delay, retrieve, script, pipe)
- Put website URL and execute your pipeline to automate the data collection process
- View results in json format directly in the application or redirect to a file using pipe action

## 🚀 Contributing

We welcome contributions! To contribute to Scrappy
1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature`)
6. Create a new Pull Request

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.