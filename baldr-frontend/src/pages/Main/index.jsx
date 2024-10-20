import { Wrapper } from "./style";
import LogoImage from "../../assets/image/opening-logo.png";
import TitleImage from "../../assets/image/opening-title.png";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../common/const";

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTE_PATH.ESCROW_LIST);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Wrapper>
      <div id="logo" className="f-col hc vc">
        <motion.div className="box" initial={{ scale: 0 }} animate={{ scale: 1, rotateZ: 360 }}>
          <img src={LogoImage} />
        </motion.div>

        <img src={TitleImage} />
      </div>
    </Wrapper>
  );
};

export default MainPage;
