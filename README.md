## Table of Contents
1. Introduction
2. Prerequisites
3. Installing JMeter
4. Using JMeter GUI
5. Running JMeter Scripts
6. Setting Up Web Tours
7. Running Tests on Web Tours

## Introduction
This project contains JMeter scripts for performance testing and a sample Web Tours application. Follow the steps below to set up JMeter, run the scripts, and install the Web Tours application.

## Prerequisites
- Java Development Kit (JDK) 8 or higher
- Apache JMeter
- Web Tours application
- Strawberry Perl

## Installing JMeter
1. **Download JMeter**:
   - Visit the Apache JMeter download page.
   - Download the binary (ZIP or TGZ) file for your operating system.

2. **Install JMeter**:
   - Extract the downloaded file to your preferred location.
   - Navigate to the `bin` directory within the extracted folder.

3. **Verify Installation**:
   - Open a command prompt and navigate to the JMeter `bin` directory.
   - Run the following command to start JMeter in GUI mode:
     ```sh
     jmeter.bat (for Windows)
     ./jmeter (for Unix/Linux)
     ```

## Using JMeter GUI
1. **Start JMeter**:
   - Navigate to the JMeter `bin` directory and run `jmeter.bat` (Windows) or `./jmeter` (Unix/Linux).

2. **Create a Test Plan**:
   - In the JMeter GUI, create a new test plan by adding thread groups, samplers, listeners, and other elements as needed.

3. **Save Your Test Plan**:
   - Save your test plan as a `.jmx` file for future use.

4. **Run the Test Plan**:
   - Click the green start button to run your test plan and view real-time results in the listeners.

## Running JMeter Scripts
1. **Open Command Prompt**:
   - Navigate to the JMeter `bin` directory.

2. **Run the JMeter Script**:
   - Use the following command to run your JMeter script in non-GUI mode:
     ```sh
     jmeter -n -t "C:/Users/manoj.b/Jmeter script/HTTP Cookie Manager.jmx" -l "C:/Users/manoj.b/Jmeter script/result.jtl"
     ```

3. **Generate an HTML Report**:
   - To generate an HTML report from the results, use the following command:
     ```sh
     jmeter -g "C:/Users/manoj.b/Jmeter script/CMD Runned Result.jtl" -o "C:/Users/manoj.b/Jmeter script/report"
     ```

## Setting Up Web Tours
1. **Download Web Tours**:
   - Visit the OpenText Marketplace.
   - Search for "Web Tours" and download the ZIP file.

2. **Install Strawberry Perl**:
   - Download and install Strawberry Perl version 5.10.1.0.

3. **Extract Web Tours**:
   - Extract the downloaded Web Tours ZIP file to your preferred location.

4. **Run Web Tours**:
   - Navigate to the extracted Web Tours directory.
   - Run the `startserver.bat` file to start the Web Tours application.

5. **Access Web Tours**:
   - Open your browser and navigate to http://localhost:1080/WebTours.

## Running Tests on Web Tours
1. **Open JMeter**:
   - Start JMeter in GUI mode by running `jmeter.bat` or `./jmeter`.

2. **Load the Test Plan**:
   - Open your JMeter test plan (`.jmx` file) that is configured to test the Web Tours application.

3. **Run the Test**:
   - Click the green start button to run the test.

4. **View Results**:
   - Use listeners in JMeter to view the results of your test.
