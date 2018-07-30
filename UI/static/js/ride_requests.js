/**
 * Created by Dr.Kimpatrick on 7/27/2018.
 */
//logoutUser, loginPageUrl, getFromCurrentUserInfo, getTokenFromVerifyUser, getUserInfo, saveToCurrentUserInfo
import {loginPageUrl, getUserInfo, saveToCurrentUserInfo, getTokenFromVerifyUser, logoutUser, getFromCurrentUserInfo} from './main.js'

export function requestRide(ride_id) {

getUserInfo();
saveToCurrentUserInfo();

let toContainRideDetails = document.getElementById("rideDetailContent");
let loginUsernameDisplayArea = document.getElementById("currentLoginUsername");

function logResultUser(result) {
    let rideInfo = result['Ride details'];
    let error = result['message']; // missing or expired token

    if (error) {
        window.location.replace(loginPageUrl)
    } else {
        loginUsernameDisplayArea.innerText = getFromCurrentUserInfo();
        let myHTML = '';
        myHTML += ' \
            <table> \
                <tr> \
                    <th>Driver (name)</th> \
                    <td>' + (rideInfo['Driver details']['username']) + '</td> \
                </tr> \
                <tr> \
                    <th>Origin</th> \
                    <td>' + (rideInfo['origin']) + '</td> \
                </tr> \
                <tr> \
                    <th>Destination</th> \
                    <td>pending</td> \
                </tr> \
                <tr> \
                    <th>Meetpoint</th> \
                    <td>' + (rideInfo['meet_point']) + '</td> \
                </tr> \
                <tr> \
                    <th>Contribution</th> \
                    <td>' + (rideInfo['contribution']) + '</td> \
                </tr> \
                <tr> \
                    <th>NumFreeSpots</th> \
                    <td>' + (rideInfo['free_spots']) + '</td> \
                </tr> \
                <tr> \
                    <th>Start date</th> \
                    <td>' + (rideInfo['start_date']) + '</td> \
                </tr> \
                <tr> \
                    <th>Finish date</th> \
                    <td>' + (rideInfo['finish_date']) + '</td> \
                </tr> \
            </table> ';

        //toContainRideDetails.innerHTML = myHTML;
        toContainRideDetails.innerHTML = myHTML;
        }
  }


function readResponseAsJSONUser(response) {
    return response.json();
  }

function getUsersJSONUser(pathToResource) {
    fetch(pathToResource) // 1
    .then(readResponseAsJSONUser) // 3
    .then(logResultUser) // 4
  }

const rideDetailUrl = "http://127.0.0.1:5000/api/v1/rides/"+ride_id;

let user_h = new Headers({"Content-Type": "application/json",
                          "Authorization": getTokenFromVerifyUser()});

// new Request(uri, option);
let option = {
    method: "GET",
    credentials: "same-origin",
    headers: user_h
};

let rides_req = new Request(rideDetailUrl, option);

getUsersJSONUser(rides_req);
}

let logout = document.getElementById("logoutThisUser");
logout.onclick = function () {
    logoutUser()
};

requestRide(6);

