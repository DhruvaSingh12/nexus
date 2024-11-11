import Header from "@/components/Header";
import Box from "@/components/Box";
import ClubItem from "./components/ClubItems"; 

const clubs = [
  { name: "I.S.T.E", url: "https://istesrmncr.netlify.app/", id: "iste", logo: '/images/iste.png' },
  { name: "ACM", url: "https://srmistncr.acm.org/", id: "acm", logo: '/images/acm.png' },
  { name: "GFG", url: "https://www.srmist-ncr-gfg.club/", id: "gfg", logo: '/images/gfg.png' },
  { name: "Hackhound", url: "https://hackhound-srm.github.io/HackHound-Website/", id: "hackhound", logo: '/images/hackhound.jpg' },
  { name: "GDSC", url: "https://www.linkedin.com/company/gdsc-srm-ghaziabad/posts/?feedView=all", id: "gdsc", logo: '/images/gdg.webp' },
  { name: "BitBucks", url: "https://www.instagram.com/bit.bucks_/", id: "bitbucks", logo: '/images/bitbucks.png' },
  { name: "Kalamgiri", url: "https://www.linkedin.com/company/kalamgiri-srm-literary-club/?originalSubdomain=in", id: "kalamgiri", logo: '/images/kalamgiri.jpg' },
  { name: "CSI", url: "https://-srm-ncr.netlify.app/", id: "csi", logo: '/images/csi.png' },
  { name: "Aarzoo", url: "https://linkedin.com/company/team-aarzoo/?originalSubdomain=in", id: "aarzoo", logo: '/images/aarzoo.jpg' },
  { name: "Magan", url: "https://www.instagram.com/magan_srmist/", id: "magan", logo: '/images/magan.png' },
];

export const revalidate = 0;

export default async function Home() {
  return (
    <div className="bg-white rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <div className="w-full flex flex-col gap-y-2 h-full">
        {/* Header Component */}
        <Box>
          <Header heading="Nexus" />
        </Box>

        {/* Intro Section */}
        <div className="overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full bg-gray-100 rounded-lg p-6 text-center">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Join. Engage. Experience.
              </h1>
              <p className="text-gray-600">
                Nexus is your all-in-one platform to discover and engage with
                college clubs and events. Stay connected, register for
                activities, and make the most of your campus experience with
                just a few clicks.
              </p>
            </div>
          </div>

          {/* Club Listing Section */}
          <Box className="flex flex-col justify-between items-center bg-gray-100 rounded-lg shadow-sm p-6">
            <div className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {clubs.map((club) => (
                  <ClubItem
                    key={club.id}
                    logo={club.logo}  
                    clubName={club.name}
                    clubLink={club.url}
                  />
                ))}
              </div>
            </div>
          </Box>

          {/* Student Portal Section */}
          <Box className="bg-white rounded-lg shadow p-6 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              STUDENT PORTAL
            </h2>
            <div className="flex flex-col items-center">
              <a
                href="https://sp.srmist.edu.in/srmiststudentportal/students/loginManager/youLogin.jsp"
                className="block bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition w-full md:w-auto text-center"
              >
                SRM Student Portal
              </a>
              <div className="mt-6">
                <h3 className="text-xl text-blue-500 bg-gray-200 rounded-md p-2 font-medium text-center">
                  Auto-Filling Captcha Extension
                </h3>
                <div className="mt-2 flex flex-col space-y-2 items-center">
                  <a
                    href="https://microsoftedge.microsoft.com/addons/detail/gigkcapfipmhbkdmhhhlgdfbnpabgjhe"
                    className="text-blue-500 hover:underline"
                  >
                    For Edge
                  </a>
                  <a
                    href="https://github.com/888krishnam/Auto-Captcha-Extension/archive/refs/heads/main.zip"
                    className="text-blue-500 hover:underline"
                  >
                    For Other Browsers Download Zip
                  </a>
                  <a
                    href="https://github.com/888krishnam/Auto-Captcha-Extension"
                    className="text-blue-500 hover:underline"
                  >
                    Github Link
                  </a>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>

      {/* Botpress Chat Integration */}
      <div className="hidden">
        <script src="https://cdn.botpress.cloud/webchat/v2.1/inject.js"></script>
        <script src="https://mediafiles.botpress.cloud/1e3ba5d0-6ee2-492c-95b8-45c2ffa766fd/webchat/v2.1/config.js"></script>
      </div>
    </div>
  );
}
