import { useRef } from "react";
import { MDBView, MDBMask } from "mdbreact";
import Theme1 from "../images/aviation.jpg";
// Photo by <a href="https://unsplash.com/@richardrschunemann?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Richard R. Schünemann</a> on <a href="https://unsplash.com/photos/0-CFHP2it0w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

import Theme2 from "../images/aviation2.jpg";
// Zdjęcie dodane przez Pixabay: https://www.pexels.com/pl-pl/zdjecie/statki-powietrzne-w-ciagu-dnia-40907/

const View = () => {
  const windowWidth = useRef(window.innerWidth);
  // console.log("width", windowWidth.current);
  const photo = windowWidth.current <= 815 ? Theme1 : Theme2;

  return (
    <div className="container p-0">
      <MDBView src={photo}>
        <MDBMask overlay="black-light" className="mask_text text-white">
          <span className="view_font pb-4">
            Let's write about aviation books...
          </span>
        </MDBMask>
      </MDBView>
    </div>
  );
};

export default View;
