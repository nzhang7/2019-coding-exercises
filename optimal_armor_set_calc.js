var crowns_available = 300;

// armor_type = [["name",cost,armor_val],["name2",cost2,armor_val2],...]
var helms = [["Serpentine Cruz Headpiece",90,23],["Keeton Mask",77,24],["Feline Visor",68,16],["Ornate Helmet of Cagampan",60,16],
             ["Offner Protector",54,15],["Leather Helmet",49,13],["Sligar's Noggin Protector",46,12],["Glass Bowl",44,12]];
var chests = [["Armor de Jandro",67,22],["Chestpiece of Vachon",64,23],["Kaer Morhen Armor",62,21],["Cured Leather Chestpiece",59,20],
              ["Smith's Plated Chestguard",58,10],["Dented Plate Armor",57,19],["Jeweled Drake Tunic",55,19],["Ginger's Gilded Armor",54,18],
              ["Garcia Guard",50,17]];
var legs = [["Famed Pon Leggings",87,22],["Ursine Trousers",78,18],["Wolven Shinguards",75,15],["Hansen's Breeches",69,17],
            ["Griffin Pants",62,11],["Tanned Leg Protection",59,15],["Manticore Braces",56,12],["Mail Emares Leggings",53,14],
            ["Woven Leggings",47,11],["Silken Pants",45,10],["Tattered Shorts",42,13]];
var boots = [["Diamond Boots",64,18],["Steel Boots",52,14],["Tate's Spiked Cleats",52,20],["Leather Lunde Shoes",35,7],
             ["Cloth Shoes",33,5]];

var current_set_cost, current_set_armor_value;
var best_set_so_far = []
var best_so_far = 0;
var i, j, k, l, extra_index;

for (i = 0; i < helms.length; i++){
  for (j = 0; j < chests.length; j++){
    for (k = 0; k < legs.length; k++){
      for (l = 0; l < boots.length; l++){
        if (i+1 < helms.length){
          extra_index = i+1;
          while (extra_index < helms.length){
            current_set_cost = helms[i][1] + chests[j][1] + legs[k][1] + boots[l][1] + helms[extra_index][1];
            current_set_armor_value = helms[i][2] + chests[j][2] + legs[k][2] + boots[l][2] + helms[extra_index][2];
            if (current_set_cost <= crowns_available && current_set_armor_value > best_so_far){
              best_so_far = current_set_armor_value;
              best_set_so_far = [helms[i][0], chests[j][0], legs[k][0], boots[l][0], helms[extra_index][0]];
            }
            extra_index++;
          }
        }
        if (j+1 < chests.length){
          extra_index = j+1;
          while (extra_index < chests.length){
            current_set_cost = helms[i][1] + chests[j][1] + legs[k][1] + boots[l][1] + chests[extra_index][1];
            current_set_armor_value = helms[i][2] + chests[j][2] + legs[k][2] + boots[l][2] + chests[extra_index][2];
            if (current_set_cost <= crowns_available && current_set_armor_value > best_so_far){
              best_so_far = current_set_armor_value;
              best_set_so_far = [helms[i][0], chests[j][0], legs[k][0], boots[l][0], chests[extra_index][0]];
            }
            extra_index++;
          }
        }
        if (k+1 < legs.length){
          extra_index = k+1;
          while (extra_index < legs.length){
            current_set_cost = helms[i][1] + chests[j][1] + legs[k][1] + boots[l][1] + legs[extra_index][1];
            current_set_armor_value = helms[i][2] + chests[j][2] + legs[k][2] + boots[l][2] + legs[extra_index][2];
            if (current_set_cost <= crowns_available && current_set_armor_value > best_so_far){
              best_so_far = current_set_armor_value;
              best_set_so_far = [helms[i][0], chests[j][0], legs[k][0], boots[l][0], legs[extra_index][0]];
            }
            extra_index++;
          }
        }
        if (l+1 < boots.length){
          extra_index = l+1;
          while (extra_index < boots.length){
            current_set_cost = helms[i][1] + chests[j][1] + legs[k][1] + boots[l][1] + boots[extra_index][1];
            current_set_armor_value = helms[i][2] + chests[j][2] + legs[k][2] + boots[l][2] + boots[extra_index][2];
            if (current_set_cost <= crowns_available && current_set_armor_value > best_so_far){
              best_so_far = current_set_armor_value;
              best_set_so_far = [helms[i][0], chests[j][0], legs[k][0], boots[l][0], boots[extra_index][0]];
            }
            extra_index++;
          }
        }
      }
    }
  }
}
