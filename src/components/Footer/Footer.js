import React from "react";
import "./Footer-styles.css";

export const Footer = () => {
    return (
        <div className="footer">
            <div className="container footer_content">
                <img
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                    alt=""
                />
                <span className="footer_item">
                    <span>
                        <h3>THE BASICS</h3>
                        <small>About RMDB</small>
                        <small>Contact Us</small>
                        <small>Support Forums</small>
                        <small>API</small>
                        <small>System Status</small>
                    </span>
                    <span>
                        <h3>GET INVOLVED</h3>
                        <small>Contribution Bible</small>
                        <small>3rd Party Application</small>
                        <small>Add New Movie</small>
                        <small>Add New Show</small>
                    </span>
                    <span>
                        <h3>COMMUNITY</h3>
                        <small>Guidelines</small>
                        <small>Discussions</small>
                        <small>Leaderboard</small>
                        <small>Twitter</small>
                    </span>
                    <span>
                        <h3>LEGAL</h3>
                        <small>Terms of Use</small>
                        <small>API Terms of Use</small>
                        <small>Privacy Policy</small>
                    </span>
                </span>
            </div>
        </div>
    );
};
