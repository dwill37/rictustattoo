import type { StaticImageData } from "next/image";

import logo from "@/assets/img/logo-rictus-ink.jpg";
import geisha from "@/assets/img/geisha-dragon-backpiece.jpg";
import fineline from "@/assets/img/fineline-vines-back.jpg";
import koi from "@/assets/img/koi-cherry-blossom-arm.jpg";
import pantherChest from "@/assets/img/panther-neotrad-chest.jpg";
import jaguar from "@/assets/img/jaguar-blackwork-forearm.jpg";
import studio from "@/assets/img/studio-artist-at-work.jpg";
import studioMirror from "@/assets/img/studio-mirror.jpg";
import studioWall from "@/assets/img/studio-wall-art.jpg";
import studioStation from "@/assets/img/studio-station.jpg";
import aztec from "@/assets/img/aztec-backpiece-in-progress.jpg";
import anime from "@/assets/img/anime-eyes-forearm-band.jpg";
import scorpion from "@/assets/img/scorpion-script-ankle.jpg";
import octopus from "@/assets/img/octopus-blackwork-stomach.jpg";
import reaper from "@/assets/img/grim-reaper-traditional-calf.jpg";
import sacredHeart from "@/assets/img/sacred-heart-thigh.jpg";
import samurai from "@/assets/img/samurai-crow-koi-torso.jpg";
import scriptArm from "@/assets/img/script-lettering-arm.jpg";
import lion from "@/assets/img/lion-floral-chest.jpg";
import scriptNeck from "@/assets/img/script-neck.jpg";
import spiderEye from "@/assets/img/spiderweb-eye-armpit.jpg";
import portrait from "@/assets/img/portrait-wings-chest.jpg";
import shark from "@/assets/img/shark-anchor-arm.jpg";
import dragon from "@/assets/img/dragon-color-shoulder.jpg";
import moonLady from "@/assets/img/moon-lady-neck.jpg";
import pantherCalf from "@/assets/img/panther-traditional-calf.jpg";

export type Photo = { src: StaticImageData; alt: string };

export const images = {
  logo: {
    src: logo,
    alt: "Rictus Ink logo: a grinning gem with sharp teeth, a golden eye and magenta smoke",
  },
  hero: {
    src: geisha,
    alt: "Large black and grey back piece of a geisha holding a fan, with a dragon, clouds and big blossoms",
  },
  finalCta: {
    src: fineline,
    alt: "Fine-line leafy vines flowing down a woman's back, with the words Love Me on the lower back",
  },
  dan: {
    src: studio,
    alt: "Tattoo artist in blue gloves tattooing a client's shoulder at the Rictus Tattoo studio, ornate black mirrors on the wall behind",
  },
} satisfies Record<string, Photo>;

/** Photos for the three tattoo cards, in order. */
export const tattooCardPhotos: Photo[] = [
  {
    src: koi,
    alt: "Fine-line koi fish in soft grey shading surrounded by pink cherry blossoms on the upper arm",
  },
  {
    src: pantherChest,
    alt: "Bold neo-traditional blue panther roaring through a dagger with leaves, tattooed on the chest",
  },
  {
    src: jaguar,
    alt: "Black and grey jaguar head with flowers and fine sun rays on the forearm",
  },
];

export const studioPhotos: Photo[] = [
  {
    src: studioMirror,
    alt: "Ornate black baroque mirror hanging on a dark wall above a tattoo lamp in the studio",
  },
  {
    src: studioWall,
    alt: "Studio wall with Japanese skeleton prints above a black panel covered in stickers and a small ornate mirror",
  },
  {
    src: studioStation,
    alt: "The tattoo station mid-session: artist at work under a lamp, sticker wall and mirrors around her, a friend throwing a peace sign",
  },
];

export const gallery: (Photo & { id: string; caption: string })[] = [
  {
    id: "aztec",
    src: aztec,
    caption: "Back piece in progress",
    alt: "Black and grey Aztec-inspired back piece in progress with step-fret patterns, a feathered serpent and a pyramid headdress",
  },
  {
    id: "scorpion",
    src: scorpion,
    caption: "Ankle",
    alt: "Scorpion with pink hearts and tiny stars under the word Brace in serif lettering on the lower leg",
  },
  { id: "octopus", src: octopus, caption: "Stomach", alt: "Large dotwork octopus spreading its tentacles across the stomach" },
  {
    id: "panther-calf",
    src: pantherCalf,
    caption: "Calf",
    alt: "Small traditional panther head with a blue eye on the calf, next to a five peso coin for scale",
  },
  { id: "lion", src: lion, caption: "Chest", alt: "Black and grey lion profile framed by a crescent moon and flowers on the chest" },
  { id: "dragon", src: dragon, caption: "Shoulder", alt: "Bright green and red Japanese-style dragon head on the shoulder and collarbone" },
  { id: "anime", src: anime, caption: "Forearm", alt: "Anime eyes with red irises framed in a black band around the forearm" },
  { id: "moon-lady", src: moonLady, caption: "Neck", alt: "Blackwork crescent moon with a woman's face behind the ear on the neck" },
  {
    id: "sacred-heart",
    src: sacredHeart,
    caption: "Thigh",
    alt: "Color sacred heart with flames, a wooden cross and a crown of thorns on the thigh",
  },
  { id: "spider-eye", src: spiderEye, caption: "Underarm", alt: "Dark eye wrapped in spiderwebs and thorns tattooed in the armpit" },
  {
    id: "samurai",
    src: samurai,
    caption: "Torso",
    alt: "Color torso piece of a samurai mask, a white crow, cherry blossoms and a golden koi",
  },
  { id: "reaper", src: reaper, caption: "Calf", alt: "Traditional black and grey grim reaper with a scythe on the calf" },
  {
    id: "portrait",
    src: portrait,
    caption: "Chest",
    alt: "Realistic portrait of a laughing baby with angel wings inside a Texas outline on the chest",
  },
  { id: "shark", src: shark, caption: "Arm", alt: "Color traditional shark wrapped in rope with an anchor on the arm" },
  {
    id: "script-arm",
    src: scriptArm,
    caption: "Arm",
    alt: "Flowing script lettering of the name Valentina with soft shadow on the inner arm",
  },
  { id: "script-neck", src: scriptNeck, caption: "Neck", alt: "Blue script lettering of the names Jorge David on the side of the neck" },
];
