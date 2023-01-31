import { useRef } from "react";
import { MDBView, MDBMask } from "mdbreact";
import Theme1 from "../images/aviation.jpg";
// Photo by Andrés Dallimonti on Unsplash
import Theme2 from "../images/aviation2.jpg";
// Zdjęcie dodane przez Pixabay: https://www.pexels.com/pl-pl/zdjecie/statki-powietrzne-w-ciagu-dnia-40907/

const View = () => {
  const windowWidth = useRef(window.innerWidth);
  // console.log("width", windowWidth.current);
  const photo = windowWidth.current <= 815 ? Theme1 : Theme2;

  return (
    <div className="container p-0">
      <MDBView src={photo}>
        <MDBMask overlay="black-strong" className="mask_text text-white">
          <h2 className="view_font pb-4">
            Let's write about aviation books...
          </h2>
        </MDBMask>
      </MDBView>
    </div>
  );
};

export default View;
