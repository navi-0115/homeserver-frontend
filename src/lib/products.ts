import { Product } from "../models/Product";

export const products: Product[] = [
  {
    id: "1",
    name: "Raspberry Pi 4",
    slug: "raspberry-pi-4",
    price: 75,
    imageUrl: "../../assets/images/m2-hat-plus.png",
    description:
      "Your tiny, dual-display, desktop computer and robot brains, smart home hub, media centre, networked AI core, factory controller, and much more",
  },
  {
    id: "2",
    name: "ODROID-H2+",
    slug: "odroid-h2+",
    price: 135,
    imageUrl: "../assets/images/odroid",
    description:
      "The ODROID H2+ is a 64Bit Windows 10 compatible SBC system. Tool it up with RAM, an HDD (or .m2/ SSD Drive) and an Operating System, and it is a very capable Windows PC system.",
  },
];
