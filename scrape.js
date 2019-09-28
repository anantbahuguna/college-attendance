const request = require("request");
const cheerio = require("cheerio");
const express = require('express')
const data = require('./config/keys')
const app = express()
var lect = [];
var tut = [];
var prac = [];
var lect_and_tut = [];

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
	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
	'Content-Type' : 'application/x-www-form-urlencoded'
}

login(data)
app.get('/',(req,res)=>{
    // login(data)
		console.log('hello', lect_and_tut);
		res.render("s.ejs",{attend:lect_and_tut});

})
function login(data){
    console.log('hello')
	request({secureProtocol: 'TLSv1_method', strictSSL: false, url:'https://webkiosk.jiit.ac.in', headers: headers}, function(error, response, body){
		if(error){
			console.log(error)
		}
		else{
            // res.send(body)
			var cookie = response.headers['set-cookie'];
			var $ = cheerio.load(body);
			var captcha = $('font[face="casteller"]').html();
			headers.Cookie = cookie;
			request.post({secureProtocol: 'TLSv1_method', strictSSL: false, url:'https://webkiosk.jiit.ac.in/CommonFiles/UseValid.jsp', form: {txtInst:"Institute", InstCode:"J128", txtuType:"Member Type", UserType101117:"S", txtCode:"Enrollment No", MemberCode: data.enroll, DOB:"DOB", DATE1:data.dob, txtPin:"Password/Pin", Password101117:data.password, BTNSubmit:"Submit", txtCode:"Enter Captcha     ", txtcap:captcha}, headers: headers}, function(error,httpResponse,body){
				if(error){
					console.log(error);
				}
				else{
                    // res.send(body)
                    // console.log(body)
					//Invalid password case here
					if(body.includes('Invalid Password')){
						// loginStatus = httpResponse.rawHeaders[5].split('=')[1];
						// dialog.showErrorBox('Authentication Error', 'Webkiosk reports that these credentials are invalid. Please make sure not to try the 3rd time before making sure!');
						// loginScreen.webContents.send('failure', 'NA');
                        // return;

                        console.log('invalid pwd')
					}
					if(httpResponse.rawHeaders[5].split('=')[1]){
						// loginStatus = httpResponse.rawHeaders[5].split('=')[1];
						// if(httpResponse.rawHeaders[5].split('=')[1].includes('Date')){
						// 	dialog.showErrorBox('Authentication Error', 'Webkiosk reports that these credentials are invalid. Please make sure not to try the 3rd time before making sure!');
						// 	loginScreen.webContents.send('failure', 'NA');
						// }
                        // return ;
                        console.log('raw')
					}
					else{
						request({secureProtocol: 'TLSv1_method', strictSSL: false, url:'https://webkiosk.jiit.ac.in/StudentFiles/StudentPage.jsp', headers:headers}, function(error, response, body){
							if(error){
								console.log(error);
							}
							else{
                                console.log('logged in')
                              getAttendance();
                                // res.send(body)
							}
						});
					}
					/*https://webkiosk.jiit.ac.in/StudentFiles/StudentPage.jsp*/
				}
			});
		}
	});
}
function getAttendance(){
	console.log('connecting')
	request({secureProtocol: 'TLSv1_method', strictSSL: false, url:"https://webkiosk.jiit.ac.in/StudentFiles/Academic/StudentAttendanceList.jsp", headers:headers}, function(error, httpResponse, body){
		if(error){
			console.log(error)
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
		}
		else{
			// console.log(body);
			if(body.includes('Session Timeout')){
				createWindow();
				getAttendance();
			}
			else{
				var $ = cheerio.load(body);
				var subjects = [];


				$('#table-1>tbody>tr').each(function(i, item){
					subjects.push($(this).children('td').eq(1).html());
					if($(this).children('td').eq(2).children('a')!=undefined){
						lect_and_tut.push($(this).children('td').eq(2).children('a').html());
					}
					else{
						lect_and_tut.push('NA');
					}
					if($(this).children('td').eq(3).children('a')!=undefined){
						lect.push($(this).children('td').eq(3).children('a').children('font').html());
					}
					else{
						lect.push('NA');
					}
					if($(this).children('td').eq(4).children('a')!=undefined){
						tut.push($(this).children('td').eq(4).children('a').html());
					}
					else{
						tut.push('NA');
					}
					if($(this).children('td').eq(5).children('a')!=undefined){
						prac.push($(this).children('td').eq(5).children('a').html());
					}
					else{
						prac.push('NA');
					}
                });
								console.log(subjects)
                console.log(lect_and_tut[0])
								console.log(prac)

				//if(mainScreen){

					//mainScreen.webContents.send('attendanceSummary', {subjects:subjects, lect_and_tut:lect_and_tut, lect:lect, tut:tut, prac:prac});
				//}
				// attdb.remove({}, {multi:true});
				// attdb.insert({attendance:{subjects:subjects, lect_and_tut:lect_and_tut, lect:lect, tut:tut, prac:prac, date:new Date()}}, function(error, results){
				// 	if(error) throw error;
				// });
			}
		}
	});
}


// login(data);

app.listen(3000,()=>{
    console.log('server running at 3000')
})
