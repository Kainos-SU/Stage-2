import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  if (!fighter) {
    return null;
  }
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  const fighterStats = createElement({
    tagName: 'div',
    className: `fighter-preview___stats`,
  });

  const fighterName = createElement ({
    tagName: "div",
    className: "fighter-preview__name"
  });
  const fighterImage = createFighterImage(fighter);
  const fighterHealth = createElement({
    tagName: "div",
    className: "fighter-preview__health"
  });
  const fighterAttack = createElement({
    tagName: "div",
    className: "fighter-preview__attack"
  });
  const fighterDefense = createElement({
    tagName: "div",
    className: "fighter-preview__defense"
  });

  fighterName.innerText = `${fighter.name}`;
  fighterHealth.innerHTML = `Health<br><progress max="100" value="${fighter.health}">${fighter.health}</progress>`;
  fighterAttack.innerHTML = `Attack<br><progress max="10" value="${fighter.attack}">${fighter.attack}</progress>`;
  fighterDefense.innerHTML = `Defense<br><progress max="10" value="${fighter.defense}">${fighter.defense}</progress>`;

  fighterStats.append(fighterHealth, fighterAttack, fighterDefense);
  fighterElement.append(fighterName, fighterImage, fighterStats);
  // todo: show fighter info (image, name, health, etc.)
  // {
  //   _id: '1',
  //   name: 'Ryu',
  //   health: 45,
  //   attack: 4,
  //   defense: 3,
  //   source: 'https://media.giphy.com/media/kdHa4JvihB2gM/giphy.gif',
  // }
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
