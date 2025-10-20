import { WeaponItem } from "classes/Item";
import { WeaponType } from "classes/Player/Inventory/Weapon";

import "./style.scss";

class ShotgunItem extends WeaponItem {
  protected name: WeaponType = "shotgun";
  protected bulletCount: number = 5;

  constructor(position: Position) {
    super({
      type: "shotgun",
      position: {
        ...position,
        y: 350
      }
    });
  }
}

export default ShotgunItem;
