import "./TitleBar.scss";
import RabobankLogo from "../../../assets/rabobank.png";

type TitleBarProps = {
  title: string;
  withLogo?: boolean;
};

const TitleBar: React.FC<TitleBarProps> = ({ title, withLogo }) => {
  return (
    <div className="titleBar">
      <span className="titleFloater">
        {withLogo && <img src={RabobankLogo} alt="Rabobank logo" />}
        <h1>{title}</h1>
      </span>
    </div>
  );
};

export default TitleBar;
