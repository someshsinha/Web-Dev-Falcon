const fs=require('fs');
const http=require('http');
const path=require('path');

const port=3000;
const server=http.createServer((req,res)=>{
    console.log(`${req.method} request received for: ${req.url}`);
    const pathName=path.join(
        __dirname,
        req.url==="/" ? "index.html" : req.url);

    const extName=path.extname(pathName).toLowerCase();

    let mimetypes={
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".png": "image/png",
    }

    const contentType = mimetypes[extName] || "application/octet-stream";

    fs.readFile(pathName,'utf8',(err,content)=>{
        if (err) {
            if (err.code === "ENOENT") {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("File not found vro");
            }
            else
            {
                res.writeHead(500);
                res.end(`Server Error: ${err.message}`);
            }
        }else
        {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf8");
        }
    })
})
server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})