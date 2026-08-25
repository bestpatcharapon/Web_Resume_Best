import Header from "../components/Header";
import ProfileStack from "../components/ProfileStack";
import ProfileInfo from "../components/ProfileInfo";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import Chatbot from "../components/Chatbot";
import ScrollProgress from "../components/ScrollProgress";
import CursorGlow from "../components/CursorGlow";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <div className="bento-container">
        <Header />

        <div className="main-content">
          <section className="profile-info-section" id="about">
            <div className="profile-grid">
              <ProfileStack />
              <ProfileInfo />
            </div>
          </section>

          <SkillsSection />
          <ExperienceSection />
        </div>
      </div>

      <Chatbot />
    </>
  );
}
