// const Person = require(`./persion`)

// const person1=new Person(`Jwy`, 30)
// person1.greeting()

//-------- for event----------

// const Logger = require('./logger')

// const logger = new Logger();

// logger.on('message', data =>
//     console.log(`Called Listener`, data)
// )

// logger.log(`Hello World`)
// logger.log(`Hi`)
// logger.log(`Hello`)

//-------------create a server----------------

const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // console.log(req.url); // / visit root, /about 訪問/about ;網頁延宕因為未指定res

  //  nodejs way to handle req //
  //  unefficient way  //
  // if (req.url===`/`) {
  //     fs.readFile(path.join(__dirname, 'public','index.html'),(err, content) => {  // 讀入index.html
  //         if (err) throw err
  //         res.writeHead(200,{'Content-Type':'text/html'}) // 寫入檔頭
  //         res.end(content) // .end closing write stream
  //     } )
  // }
  // if (req.url===`/about`) {
  //     fs.readFile(path.join(__dirname, 'public','about.html'),(err, content) => {  // 讀入index.html
  //         if (err) throw err
  //         res.writeHead(200,{'Content-Type':'text/html'}) // 寫入檔頭
  //         res.end(content) // .end closing write stream
  //     } )
  // }

  // if (req.url===`/api/users`) {  // rest api
  //    const users=[
  //     {name: 'Bob Smith', age:40},
  //     {name: 'Jhon Doe', age:30},
  //     {name: 'Alex Lin', age:28},
  //    ]
  //    res.writeHead(200,{'Content-Type':'application/json'})
  //    res.end(JSON.stringify(users))
  // }

  // Build file path
  let filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );
  // Extension of file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = "text/html"; // default

  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }
  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Error NO ENTry
        // Page not found
        fs.readFile(
          path.join(__dirname, "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        // Some server err
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");

    }
  });
});

const PORT = process.env.PORT || 5000; // process.env  nodejs使用者環境變量 物件 // 先找process.env.PORT找不到再用5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
