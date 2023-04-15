const { app, BrowserWindow, Menu } = require('electron')
const fs = require('fs')

let mainWindow
const fileEx = "./dev"
var isDev = false

function checkInternet(cb) {
    require('dns').lookup('google.com',function(err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}

checkInternet(function(isConnected) {
    if (isConnected) {
        app.on("ready", () => {
            mainWindow = new BrowserWindow({
                minHeight: 500,
                minWidth: 821,
                maxHeight: 500,
                maxWidth: 821,
                title: "Radio Disensa 2.0",
                icon: __dirname + "/src/favicon.jpg"
            });
            mainWindow.loadFile(__dirname + "/src/index.html")
            Menu.setApplicationMenu(null)
        
            if(fs.existsSync(fileEx))
            {
                mainWindow.webContents.toggleDevTools();
            }
        })
    } else {
        app.on("ready", () => {
            mainWindow = new BrowserWindow({
                minHeight: 500,
                minWidth: 821,
                maxHeight: 500,
                maxWidth: 821,
                title: "Connection Error - Radio Disensa 2.0",
                icon: __dirname + "/src/error.png"
            });
            mainWindow.loadFile(__dirname + "/src/ConnectError/index.html")
            Menu.setApplicationMenu(null)
        })
    }
});    

app.on("window-all-closed", () => {
    app.quit();
});