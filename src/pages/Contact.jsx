import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/logo.jpg";
import iconFacebook from "../assets/icon-social-facebook.svg";
import iconGmail from "../assets/icon-social-gmail.svg";
import iconInstagram from "../assets/icon-social-instagram.svg";
import iconYoutube from "../assets/icon-social-youtube.svg";
import iconWhatsapp from "../assets/icon-social-whatsapp.svg";
import { contactDetails } from "../siteData";

export default function Contact() {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    category: "general",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        contact: "",
        category: "general",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <main id="main-content" className="contact-page">
      {/* Hero Header */}
      <section className="contact-hero">
        <div className="container contact-hero__inner">
          <img src={logo} alt="News Yatra Logo" className="contact-hero__logo" />
          <h1 className="contact-hero__title">
            {lang === "mr" ? "आमच्याशी संपर्क साधा" : "Contact News Yatra"}
          </h1>
          <p className="contact-hero__subtitle">
            {lang === "mr"
              ? "बातमी, जाहिरात किंवा आपल्या प्रतिक्रिया पाठवण्यासाठी खालील संपर्क माध्यमांचा वापर करा."
              : "Reach out to News Yatra for news tips, advertising, or general inquiries."}
          </p>
        </div>
      </section>

      <div className="container contact-page__body">
        {/* Contact Info Cards */}
        <section className="contact-cards-grid">
          {/* Phone / Call */}
          <a href={`tel:${contactDetails.phone}`} className="contact-card contact-card--phone">
            <div className="contact-card__icon-wrapper">📞</div>
            <div className="contact-card__content">
              <h3>{lang === "mr" ? "फोन / कॉलिंग" : "Phone Call"}</h3>
              <p className="contact-card__val">{contactDetails.phoneFormatted}</p>
              <span className="contact-card__action">{lang === "mr" ? "कॉल करण्यासाठी क्लिक करा" : "Click to Call"} &rarr;</span>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={contactDetails.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-card--whatsapp"
          >
            <div className="contact-card__icon-wrapper">
              <img src={iconWhatsapp} alt="WhatsApp" width="28" height="28" />
            </div>
            <div className="contact-card__content">
              <h3>WhatsApp</h3>
              <p className="contact-card__val">{contactDetails.phoneFormatted}</p>
              <span className="contact-card__action">{lang === "mr" ? "मेसेज पाठवा" : "Send Message"} &rarr;</span>
            </div>
          </a>

          {/* Email / Gmail */}
          <a href={`mailto:${contactDetails.email}`} className="contact-card contact-card--gmail">
            <div className="contact-card__icon-wrapper">
              <img src={iconGmail} alt="Gmail" width="28" height="28" />
            </div>
            <div className="contact-card__content">
              <h3>{lang === "mr" ? "ई-मेल" : "Official Email"}</h3>
              <p className="contact-card__val">{contactDetails.email}</p>
              <span className="contact-card__action">{lang === "mr" ? "ई-मेल पाठवा" : "Send Email"} &rarr;</span>
            </div>
          </a>

          {/* Instagram */}
          <a
            href={contactDetails.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-card--instagram"
          >
            <div className="contact-card__icon-wrapper">
              <img src={iconInstagram} alt="Instagram" width="28" height="28" />
            </div>
            <div className="contact-card__content">
              <h3>Instagram</h3>
              <p className="contact-card__val">@newsyatra2025</p>
              <span className="contact-card__action">{lang === "mr" ? "फॉलो करा" : "Follow Us"} &rarr;</span>
            </div>
          </a>

          {/* Facebook */}
          <a
            href={contactDetails.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-card--facebook"
          >
            <div className="contact-card__icon-wrapper">
              <img src={iconFacebook} alt="Facebook" width="28" height="28" />
            </div>
            <div className="contact-card__content">
              <h3>Facebook</h3>
              <p className="contact-card__val">News Yatra Official</p>
              <span className="contact-card__action">{lang === "mr" ? "पेजला भेट द्या" : "Visit Page"} &rarr;</span>
            </div>
          </a>

          {/* YouTube */}
          <a
            href={contactDetails.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-card--youtube"
          >
            <div className="contact-card__icon-wrapper">
              <img src={iconYoutube} alt="YouTube" width="28" height="28" />
            </div>
            <div className="contact-card__content">
              <h3>YouTube Channel</h3>
              <p className="contact-card__val">@NewsYatraS</p>
              <span className="contact-card__action">{lang === "mr" ? "सबस्क्राईब करा" : "Subscribe"} &rarr;</span>
            </div>
          </a>
        </section>

        {/* Contact & News Tip Form */}
        <section className="contact-form-container">
          <div className="contact-form__header">
            <h2>{lang === "mr" ? "संदेश पाठवा किंवा बातमी सुचवा" : "Send Us a Message or News Tip"}</h2>
            <p>
              {lang === "mr"
                ? "तुमच्या परिसरातील महत्त्वाच्या बातम्या किंवा समस्या आमच्यापर्यंत पोहोचवण्यासाठी खालील फॉर्म भरा."
                : "Have a news tip or general feedback? Send your inquiry directly to our newsroom."}
            </p>
          </div>

          {submitted ? (
            <div className="contact-form__success">
              ✅ {lang === "mr" ? "आपला संदेश यशस्वीरीत्या पाठवला गेला आहे! आम्ही लवकरच आपल्याशी संपर्क साधू." : "Thank you! Your message has been received successfully."}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label htmlFor="contact-name">{lang === "mr" ? "संपूर्ण नाव *" : "Full Name *"}</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder={lang === "mr" ? "तुमचे नाव..." : "Enter your name..."}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-info">{lang === "mr" ? "ई-मेल किंवा मोबाईल क्र." : "Email or Phone Number"}</label>
                  <input
                    id="contact-info"
                    type="text"
                    placeholder={lang === "mr" ? "ई-मेल / फोन..." : "Your email / phone..."}
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label htmlFor="contact-category">{lang === "mr" ? "विषय / वर्गवारी" : "Category"}</label>
                  <select
                    id="contact-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="general">{lang === "mr" ? "सामान्य चौकशी" : "General Inquiry"}</option>
                    <option value="news-tip">{lang === "mr" ? "बातमी सुचवणे / टिप" : "News Tip"}</option>
                    <option value="advertising">{lang === "mr" ? "जाहिरात" : "Advertising"}</option>
                    <option value="feedback">{lang === "mr" ? "प्रतिक्रिया" : "Feedback"}</option>
                  </select>
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-subject">{lang === "mr" ? "शीर्षक / विषय" : "Subject"}</label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder={lang === "mr" ? "विषय लिहा..." : "Subject of message..."}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-form__group">
                <label htmlFor="contact-message">{lang === "mr" ? "संदेश / मजकूर *" : "Message / Details *"}</label>
                <textarea
                  id="contact-message"
                  rows="5"
                  required
                  placeholder={lang === "mr" ? "तुमचा संदेश येथे लिहा..." : "Write your message details here..."}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="contact-form__submit-btn">
                {lang === "mr" ? "संदेश पाठवा ✉️" : "Send Message ✉️"}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
