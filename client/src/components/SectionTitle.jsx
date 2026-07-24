
import "./SectionTitle.css";

const SectionTitle = ({ label, title, description, align = "left" }) => {
  return (
    <div className={`section-header section-header-${align}`}>
      {label && <span className="section-label">{label}</span>}

      {title && <h2 className="section-title">{title}</h2>}

      {description && <p className="section-description">{description}</p>}
    </div>
  );
};

export default SectionTitle;
