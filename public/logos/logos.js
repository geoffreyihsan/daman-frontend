import Image from "next/image";

export function Logo({ id, alt }) {
  return (
    <Image src={`/logos/${id}.png`} alt={alt} fill sizes="100%" priority />
  );
}

export function LogoOfDamanHeader() {
  return <Logo id={"daman_header_logo"} alt={"DaMan Logo"} />;
}

export function LogoOfDamanPulse() {
  return <Logo id={"daman_pulse_logo"} alt={"DaMan Pulse Logo"} />;
}

export function LogoOfDamg() {
  return <Logo id={"damg_logo"} alt={"Destinasian Media Group Logo"} />;
}

export function LogoOfDamanFooter() {
  return <Logo id={"daman_footer_logo"} alt={"DaMan Logo"} />;
}

export function LogoOfDa() {
  return <Logo id={"da_logo"} alt={"Destinasian Logo"} />;
}

export function LogoOfDai() {
  return <Logo id={"dai_logo"} alt={"Destinasian Indonesia Logo"} />;
}

export function LogoOfPrestige() {
  return <Logo id={"prestige_logo"} alt={"Prestige Logo"} />;
}

export function LogoOfScop3() {
  return <Logo id={"scop3_logo"} alt={"Scop3 Logo"} />;
}
