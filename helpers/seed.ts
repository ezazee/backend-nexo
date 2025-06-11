import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "../src/utils/dbConnect";
import { Ui } from "../src/models/uiModel";
import { Web } from "../src/models/webModel";

dotenv.config();

const data = {
  UiPortfolio: [
    {
      id: 1,
      client: "Client",
      duration: "3 Days",
      category: "Leaflet, Certificate, Logo Design",
      title: "Logo Circumcision Pack",
      description:
        "Logo packages and details such as advertising posters, printed certificates for children and others, This project was carried out on March-07-2023 and completed on March-16-2023",
      image: "/img/design/1.webp",
      slug: "Logo Pack Design",
    },

    {
      id: 2,
      category: "Logo Design",
      client: "Client",
      duration: "5 Days",
      title: "Logo Lawfirm Only",
      description:
        "This logo package is only ordered from clients who only want to have a personal logo for their own needs, This project was carried out on March-26-2023 and completed on April-14-2023",
      image: "/img/design/2.webp",
      slug: "Logo Only Design",
    },
    {
      id: 3,
      category: "UI Web Design",
      title: "Landing Page Food",
      client: "Client",
      duration: "7 Days",
      description:
        "The UI Design landing page for this website uses a Glass Morphism design and is combined with cute 3D Character Design elements",
      image: "/img/design/3.webp",
      slug: "Landing Page Food Design",
      embedCode:
        '<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fj9HOCeg0D36r1qqmn1rDxB%2FLatihan%3Ftype%3Ddesign%26node-id%3D320%253A5424%26mode%3Ddesign%26t%3DmniuoFRh0Q0AveRx-1" allowfullscreen></iframe>',
    },
    {
      id: 4,
      title: "Landing Page Marketplace",
      category: "UI Web Design",
      client: "Client",
      duration: "7 Days",
      description:
        "Landing page The UI design of this website uses Glass Morphism design to make the marketplace website much different from the others",
      image: "/img/design/4.webp",
      slug: "Landing Page Marketplace Design",
      embedCode:
        '<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fj9HOCeg0D36r1qqmn1rDxB%2FLatihan%3Ftype%3Ddesign%26node-id%3D320%253A5424%26mode%3Ddesign%26t%3DmniuoFRh0Q0AveRx-1" allowfullscreen></iframe>',
    },
    {
      id: 5,
      title: "Mobile Streaming App",
      category: "UI App Design",
      client: "Client",
      duration: "12 Days",
      description:
        "Design UI Mobile application for streaming anime. I started this by creating a logo, user flow and others from scratch. This project has been completed but is currently under development",
      image: "/img/design/5.webp",
      slug: "Mobike Streaming App Design",
      embedCode:
        '<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fj9HOCeg0D36r1qqmn1rDxB%2FLatihan%3Ftype%3Ddesign%26node-id%3D320%253A5424%26mode%3Ddesign%26t%3DmniuoFRh0Q0AveRx-1" allowfullscreen></iframe>',
    },
    {
      id: 6,
      title: "Landing Page Streaming App",
      category: "UI Web Design",
      client: "Client",
      duration: "14 Days",
      description:
        "Website UI Design supports advertising for pre-made mobile applications",
      image: "/img/design/6.webp",
      slug: "Landing Page Streaming App Design",
      embedCode:
        '<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fj9HOCeg0D36r1qqmn1rDxB%2FLatihan%3Ftype%3Ddesign%26node-id%3D320%253A5424%26mode%3Ddesign%26t%3DmniuoFRh0Q0AveRx-1" allowfullscreen></iframe>',
    },
    {
      id: 7,
      title: "Merchendaise Football Club",
      category: "Clothing Design, Merchendaise Design",
      client: "Client",
      duration: "24 Days",
      description:
        "Merchandise Making Project for one of the local football clubs. Starting from hats, jackets, bracelets, and much more",
      image: "/img/design/7.webp",
      slug: "Merchendaise Football Club Design",
    },
    {
      id: 8,
      title: "Uniform Company Mockup",
      category: "Clothing Design",
      client: "Client",
      duration: "24 Days",
      description:
        "Project for making uniforms for start-up companies that are in need of uniforms for staff and managers. Starting from blazers, men's suits, custom uniforms etc",
      image: "/img/design/8.webp",
      slug: "Uniform Company Mockup Design",
    },
  ],
  WebPortfolio: [
    {
      id: 1,
      title: "Product Profile Commerse",
      category: "Website Product Company",
      client: "PT. Eka Mandiri Asa Sejati",
      duration: "60 Days",
      description:
        "This E-commerce website is one of the products of the company PT. Eka Mandiri Asa Sejati for one of the regions in Indonesia which is a client of this company",
      image: "/img/code/1.webp",
      github: "https://github.com/ezazee/Nikila",
      webUrl: "https://nikila.vercel.app/",
      embedCode:
        '<iframe src="https://nikila.vercel.app/" width="100%" height="790px" frameBorder="0" style="border: 0;"></iframe>',
    },
    {
      id: 2,
      title: "Netflix Clone",
      category: "Clone Website",
      client: "Client",
      duration: "30 Days",
      description:
        "This Clone Netflix website can only view film casts, trailers and film categories that have only come out recently",
      image: "/img/code/2.webp",
      github: "https://github.com/ezazee/zaflixx",
      webUrl: "https://zaflix.vercel.app/",
      embedCode:
        '<iframe src="https://zaflix.vercel.app//" width="100%" height="790px" frameBorder="0" style="border: 0;"></iframe>',
    },
    {
      id: 3,
      title: "Advertise Dashboard",
      category: "Common Website",
      client: "Client",
      duration: "15 Days",
      description:
        "The Sirace website is a website for marketing dashboards that only displays dummy data created by local data, created for college students who need this website for their college work.",
      image: "/img/code/3.webp",
      github: "https://github.com/ezazee/next_dashboard",
      webUrl: "https://sirace.vercel.app/",
      embedCode:
        '<iframe src="https://sirace.vercel.app/" width="100%" height="790px" frameBorder="0" style="border: 0;"></iframe>',
    },
    {
      id: 4,
      title: "Barbershop",
      category: "Barbershop Website",
      client: "PT. Graha Kara Digital",
      duration: "30 Days",
      description:
        "PangLing, Barbershop website for one of the products of an IT company engaged in digital community service applications",
      image: "/img/code/4.webp",
      github: "https://github.com/ezazee/-portfolio-product1",
      webUrl: "https://pang-ling.vercel.app/",
      embedCode:
        '<iframe src="https://pang-ling.vercel.app/" width="100%" height="790px" frameBorder="0" style="border: 0;"></iframe>',
    },
    {
      id: 5,
      title: "Personal Portfolio Website",
      category: "Portfolio Website",
      client: "Client",
      duration: "25 Days",
      description:
        "This personal portfolio website was created according to the points given by the client",
      image: "/img/code/5.webp",
      github: "https://github.com/ezazee/portfolio",
      webUrl: "https://portonew.vercel.app/",
      embedCode:
        '<iframe src="https://portonew.vercel.app/" width="100%" height="790px" frameBorder="0" style="border: 0;"></iframe>',
    },
    {
      id: 6,
      title: "TikTok Clone",
      category: "Clone Website",
      client: "Client",
      duration: "60 Days",
      description:
        "This TikTok clone was created only as a personal portfolio. You can upload videos, watch videos, comment, even like videos",
      image: "/img/code/6.webp",
      github: "https://github.com/ezazee/-portfolio-tiktak",
      webUrl: "https://tiktakk.vercel.app/",
      embedCode:
        '<iframe src="https://tiktakk.vercel.app/" width="100%" height="790px" frameBorder="0" style="border: 0;"></iframe>',
    },
  ],
};

const seedDatabase = async () => {
  await dbConnect();

  try {
    // Hapus data lama
    await Ui.deleteMany({});
    await Web.deleteMany({});

    // Tambah data baru
    await Ui.insertMany(data.UiPortfolio);
    await Web.insertMany(data.WebPortfolio);

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
