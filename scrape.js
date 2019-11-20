const request = require("request");
const cheerio = require("cheerio");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const redis = require("redis");
const redisStore = require("connect-redis")(session);
const client = redis.createClient();
var cors = require("cors");
var isValidPwd = true;
var isValidCredentials = true;
// var data = require('./config/keys')
const app = express();

var lect = [];
var tut = [];
var prac = [];
var subjects = [];
var lect_and_tut = [];

app.use(
  session({
    secret: "ssshhhhh",
    store: new redisStore({
      host: "localhost",
      port: 6379,
      client: client,
      ttl: 260
    }),
    saveUninitialized: false,
    resave: false
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// request("https://www.kickassanime.ru/", (error, response, html) => {
//   if (!error & (response.statusCode == 200)) {
//     const $ = cheerio.load(html);

//     const schedulelist = $("#schedulelist_accorion");
//     console.log(schedulelist.text());
//   }
// });

// var data = {
//     'enroll': 9917103192,
//     'dob': '15-03-1998',
//     'password': ''
// }
// var data = keys.data
var headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36",
  "Content-Type": "application/x-www-form-urlencoded"
};
function login(data) {
  console.log("hello");
  request(
    {
      secureProtocol: "TLSv1_method",
      strictSSL: false,
      url: "https://webkiosk.jiit.ac.in",
      headers: headers
    },
    function(error, response, body) {
      if (error) {
        console.log(error);
      } else {
        // res.send(body)
        var cookie = response.headers["set-cookie"];
        var $ = cheerio.load(body);
        var captcha = $('font[face="casteller"]').html();
        headers.Cookie = cookie;
        request.post(
          {
            secureProtocol: "TLSv1_method",
            strictSSL: false,
            url: "https://webkiosk.jiit.ac.in/CommonFiles/UseValid.jsp",
            form: {
              txtInst: "Institute",
              InstCode: "J128",
              txtuType: "Member Type",
              UserType101117: "S",
              txtCode: "Enrollment No",
              MemberCode: data.enroll,
              DOB: "DOB",
              DATE1: data.dob,
              txtPin: "Password/Pin",
              Password101117: data.password,
              BTNSubmit: "Submit",
              txtCode: "Enter Captcha     ",
              txtcap: captcha
            },
            headers: headers
          },
          function(error, httpResponse, body) {
            console.log(body);
            if (error) {
              console.log(error);
            } else {
              // res.send(body)
              console.log(body);
              //Invalid password case here
              if (body.includes("Invalid Password")) {
                // loginStatus = httpResponse.rawHeaders[5].split('=')[1];
                // dialog.showErrorBox('Authentication Error', 'Webkiosk reports that these credentials are invalid. Please make sure not to try the 3rd time before making sure!');
                // loginScreen.webContents.send('failure', 'NA');
                // return;
                isValidPwd = false;
                console.log(body);
                console.log("invalid pwd");
              }
              if (httpResponse.rawHeaders[5].split("=")[1]) {
                // loginStatus = httpResponse.rawHeaders[5].split('=')[1];
                // if(httpResponse.rawHeaders[5].split('=')[1].includes('Date')){
                // 	dialog.showErrorBox('Authentication Error', 'Webkiosk reports that these credentials are invalid. Please make sure not to try the 3rd time before making sure!');
                // 	loginScreen.webContents.send('failure', 'NA');
                // }
                // return ;
                isValidCredentials = false;
                console.log("invalid credentials");
              } else {
                request(
                  {
                    secureProtocol: "TLSv1_method",
                    strictSSL: false,
                    url:
                      "https://webkiosk.jiit.ac.in/StudentFiles/StudentPage.jsp",
                    headers: headers
                  },
                  function(error, response, body) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("logged in");
                      getAttendance();
                      // res.send(body)
                    }
                  }
                );
              }
              /*https://webkiosk.jiit.ac.in/StudentFiles/StudentPage.jsp*/
            }
          }
        );
      }
    }
  );
}
function getAttendance() {
  console.log("connecting");
  request(
    {
      secureProtocol: "TLSv1_method",
      strictSSL: false,
      url:
        "https://webkiosk.jiit.ac.in/StudentFiles/Academic/StudentAttendanceList.jsp",
      headers: headers
    },
    function(error, httpResponse, body) {
      if (error) {
        console.log(error);
        // attdb.find({}, function(error, results){
        // 	if(error) throw error;
        // 	else{
        // 		if(results[0].attendance){
        // 			if(mainScreen){
        // 				mainScreen.webContents.send('attendanceSummary', results[0].attendance);
        // 			}
        // 		}
        // 	}
        // });
        // //ECONNREFUSED
        //getaddrinfo
        console.log(error);
        /*if('session timeout'){
				//relogin(getattendance);
				login();
				getAttendance();
			}*/
      } else {
        // console.log(body);
        if (body.includes("Session Timeout")) {
          createWindow();
          getAttendance();
        } else {
          var $ = cheerio.load(body);

          $("#table-1>tbody>tr").each(function(i, item) {
            subjects.push(
              $(this)
                .children("td")
                .eq(1)
                .html()
            );
            if (
              $(this)
                .children("td")
                .eq(2)
                .children("a") != undefined
            ) {
              lect_and_tut.push(
                $(this)
                  .children("td")
                  .eq(2)
                  .children("a")
                  .html()
              );
            } else {
              lect_and_tut.push("NA");
            }
            if (
              $(this)
                .children("td")
                .eq(3)
                .children("a") != undefined
            ) {
              lect.push(
                $(this)
                  .children("td")
                  .eq(3)
                  .children("a")
                  .children("font")
                  .html()
              );
            } else {
              lect.push("NA");
            }
            if (
              $(this)
                .children("td")
                .eq(4)
                .children("a") != undefined
            ) {
              tut.push(
                $(this)
                  .children("td")
                  .eq(4)
                  .children("a")
                  .html()
              );
            } else {
              tut.push("NA");
            }
            if (
              $(this)
                .children("td")
                .eq(5)
                .children("a") != undefined
            ) {
              prac.push(
                $(this)
                  .children("td")
                  .eq(5)
                  .children("a")
                  .html()
              );
            } else {
              prac.push("NA");
            }
          });
          console.log(subjects);
          console.log(lect_and_tut[0]);
          console.log(prac);

          //if(mainScreen){

          //mainScreen.webContents.send('attendanceSummary', {subjects:subjects, lect_and_tut:lect_and_tut, lect:lect, tut:tut, prac:prac});
          //}
          // attdb.remove({}, {multi:true});
          // attdb.insert({attendance:{subjects:subjects, lect_and_tut:lect_and_tut, lect:lect, tut:tut, prac:prac, date:new Date()}}, function(error, results){
          // 	if(error) throw error;
          // });
        }
      }
    }
  );
}

app.use(cors());

app.get("/", (req, res) => {
  let sess = req.session;
  if (sess.enroll) {
    return res.redirect("http://localhost:3000/home");
  }

  res.redirect("http://localhost:3000/");
});

// login(data)
app.post("/login", (req, res) => {
  let sess = req.session;
  sess.enroll = req.body.enroll;
  var data = req.body;
  // sess.data = req.body
  data.dob = data.dob
    .split("-")
    .reverse()
    .join("-");
  login(data);
  console.log("request body", data);
  console.log("hello", lect_and_tut);
  // res.render("s.ejs",{attend:lect_and_tut,sub:subjects});
  console.log("hello", lect_and_tut);
  console.log("prac", prac);
  setTimeout(() => {
    console.log(isValidPwd, isValidCredentials);
    if (isValidPwd && isValidCredentials) {
      res.send(true);
    } else {
      res.send(false);
    }
  }, 5000);
});

app.get("/showAttendance", (req, res) => {
  console.log("sending this to react", subjects);
  var attend = [];
  for (let i = 0; i < subjects.length; i++) {
    attend[i] = lect_and_tut[i] || prac[i];
  }
  var data = subjects.concat(attend);
  console.log(attend);
  res.send(data);
});

app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
});

// login(data);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running at 5000");
});
