import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdbreact";
import { bookCategories } from "../utils";

const Filters = ({ resetFilters, setFilters, text, category, searchBooks }) => {
  // console.log("lala", text, category);

  const setBtn = () => {
    if (text || category) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <MDBRow center className="mx-auto mt-5 mb-5 w-75-sm">
      <MDBCol md="8" lg="6" xl="6">
        <MDBCard>
          <MDBCardBody className="mx-4 text-center">
            <h4>Filters</h4>
            <MDBInput
              onChange={setFilters("text")}
              value={text}
              label="Search By Author/Title"
              type="text"
              className="mb-5"
              style={{ color: "#757575" }}
            />

            <select
              style={{
                width: "100%",
                border: "none",
                fontWeight: "300",
                borderBottom: "1px solid #ced4da",
                backgroundColor: "transparent",
                padding: "0 0 7px 0",
                color: "#757575",
                cursor: "pointer",
              }}
              className="mb-5"
              onChange={setFilters("category")}
              value={category}
            >
              <option value="">Search By Category</option>
              {bookCategories.map((cat) => (
                <option value={cat} key={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="text-center mb-3">
              <MDBBtn
                onClick={searchBooks}
                gradient="peach"
                rounded
                className="btn btn-sm z-depth-3a"
              >
                Search
              </MDBBtn>
            </div>
            <MDBBtn className="btn-sm" onClick={resetFilters}>
              Reset
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default Filters;
