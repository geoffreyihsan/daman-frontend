import { gql } from "@apollo/client";
import { NavigationMenu } from "../components";

export const GetMenus = gql`
  ${NavigationMenu.fragments.entry}
  query GetMenus(
    $primaryLocation: MenuLocationEnum
    $secondaryLocation: MenuLocationEnum
    $thirdLocation: MenuLocationEnum
    $navigationLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    primaryMenuItems: menuItems(
      where: { location: $primaryLocation }
      first: 100
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    secondaryMenuItems: menuItems(
      where: { location: $secondaryLocation }
      first: 100
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    thirdMenuItems: menuItems(where: { location: $thirdLocation }, first: 100) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    navigationMenuItems: menuItems(
      where: { location: $navigationLocation }
      first: 100
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(
      where: { location: $footerLocation }
      first: 100
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
