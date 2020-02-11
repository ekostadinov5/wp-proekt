import React from 'react';

const Footer = () => {

    window.onscroll = () => {
        const backToTopBtn = document.getElementById("backToTopBtn");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    }

    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    return (
        <footer className="container m-5">
            <button onClick={topFunction} id={"backToTopBtn"} className={"btn btn-dark"} title={"Врати се на почеток"}>
                <i className="fa fa-angle-up"/>
            </button>
        </footer>
    );
};

export default Footer;
