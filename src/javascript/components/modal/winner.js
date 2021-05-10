import { showModal } from './modal'
import {createFighterImage} from '../fighterPreview';

export function showWinnerModal(fighter) {
  let title = `Winner is ${fighter.name}`;
  let body = createFighterImage(fighter);
  
  showModal({title:title, bodyElement:body});
  // call showModal function
}
