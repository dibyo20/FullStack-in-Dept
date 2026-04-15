import React from "react";
import { Link } from "react-router-dom";
import "../../styles/RightSection.scss";
import { MdOutlineWbSunny } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

const Right = () => {
  return (
    <div className="right">
      <span className="theme">
        <MdOutlineWbSunny />
      </span>

      <Link className="signin">Sign In</Link>
      <Link className="ham"><RxHamburgerMenu/></Link>
    </div>
  );
};

export default Right;
