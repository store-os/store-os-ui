import { Drawer } from "antd";
import SAutocomplete from "../components/SAutocomplete";

const Search = ({ visibility, searchClose }) => {
  return (
    <Drawer
      placement={"top"}
      closable={true}
      onClose={() => searchClose()}
      visible={visibility}
      key={"search-site"}
      height={"100vh"}
    >
      <SAutocomplete />
    </Drawer>
  );
};

export default Search;
