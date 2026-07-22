import { useState } from "react";
import { uploadNewsModal } from "../siteData";
import { useLanguage } from "../context/LanguageContext";

export default function UploadArticleModal({ isOpen, onClose }) {
  const { lang } = useLanguage();
  const t = uploadNewsModal;

  const [headline, setHeadline] = useState("");
  const [category, setCategory] = useState("");
  const [articleText, setArticleText] = useState("");
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 5) {
      setFileError(t.fileLimitAlert[lang]);
      setFiles(selectedFiles.slice(0, 5));
    } else {
      setFileError("");
      setFiles(selectedFiles);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length > 5) {
      setFileError(t.fileLimitAlert[lang]);
      return;
    }
    // Simulation of form submission
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setHeadline("");
      setCategory("");
      setArticleText("");
      setFiles([]);
      onClose();
    }, 2000);
  };

  return (
    <div className="upload-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="upload-modal__header">
          <h3 className="upload-modal__title">{t.modalTitle[lang]}</h3>
          <button
            type="button"
            className="upload-modal__close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {isSubmitted ? (
          <div className="upload-modal__success">
            <span className="upload-modal__success-icon">✓</span>
            <p>{t.successMessage[lang]}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="upload-modal__form">
            {/* Input 1: Headline */}
            <div className="upload-modal__field">
              <label htmlFor="headline-input" className="upload-modal__label">
                {t.headlineLabel[lang]} <span className="required-star">*</span>
              </label>
              <input
                id="headline-input"
                type="text"
                className="upload-modal__input"
                placeholder={t.headlinePlaceholder[lang]}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                required
              />
            </div>

            {/* Input 2: Category Dropdown */}
            <div className="upload-modal__field">
              <label htmlFor="category-select" className="upload-modal__label">
                {t.categoryLabel[lang]} <span className="required-star">*</span>
              </label>
              <select
                id="category-select"
                className="upload-modal__select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  {t.categoryPlaceholder[lang]}
                </option>
                {t.categoriesList.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label[lang]}
                  </option>
                ))}
              </select>
            </div>

            {/* Input 3: Article Text */}
            <div className="upload-modal__field">
              <label htmlFor="article-text-input" className="upload-modal__label">
                {t.textLabel[lang]} <span className="required-star">*</span>
              </label>
              <textarea
                id="article-text-input"
                rows="4"
                className="upload-modal__textarea"
                placeholder={t.textPlaceholder[lang]}
                value={articleText}
                onChange={(e) => setArticleText(e.target.value)}
                required
              />
            </div>

            {/* Input 4: Images / Videos (Max 5) */}
            <div className="upload-modal__field">
              <label htmlFor="media-files-input" className="upload-modal__label">
                {t.mediaLabel[lang]}
              </label>
              <input
                id="media-files-input"
                type="file"
                className="upload-modal__file-input"
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
              />
              <span className="upload-modal__hint">{t.mediaHint[lang]}</span>

              {fileError && <div className="upload-modal__error">{fileError}</div>}

              {files.length > 0 && (
                <ul className="upload-modal__file-list">
                  {files.map((file, idx) => (
                    <li key={idx} className="upload-modal__file-item">
                      📎 {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="upload-modal__actions">
              <button type="button" className="upload-modal__cancel-btn" onClick={onClose}>
                {t.cancelBtn[lang]}
              </button>
              <button type="submit" className="upload-modal__submit-btn">
                {t.submitBtn[lang]}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
