import React, { useState, useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const InstructivePage = () => {
  const [articleNumber, setArticleNumber] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (articleNumber < 1) {
      setArticleNumber(1);
    }
    if (articleNumber > 3) {
      setArticleNumber(3);
    }
  }, [articleNumber]);
  function articleHandler(e, value) {
    e.preventDefault();
    console.log(value);
    if (value === "forward") {
      setArticleNumber((currArticle) => currArticle + 1);
      return;
    }
    setArticleNumber((currArticle) => currArticle - 1);
  }
  const ListItem = ({ children }) => {
    return (
      <div className="my-4">
        <span className="text-bold text-red-800">{children}</span>
      </div>
    );
  };
  const PageWrapper = ({ children }) => {
    return (
      <div className="flex flex-col items-center justify-center mb-8 text-white">
        {children}
      </div>
    );
  };
  const PageTitle = ({ children, position }) => {
    return (
      <p className={"text-red-800 font-bold text-center " + position}>
        {children}
      </p>
    );
  };
  return (
    <main className="flex-grow flex flex-col items-center justify-start px-4 lg:text-xl">
      <p className="text-red-800 font-bold text-xl mt-8 text-center mb-4">
        How to play Blackjack Game
      </p>
      {articleNumber === 1 && (
        <PageWrapper>
          <PageTitle position={"mb-6"}>
            {articleNumber}
            {"-) "}Learn the value of the cards.
          </PageTitle>

          <p className="mb-4 lg:px-12">
            In Blackjack, each card has a value that remains constant throughout
            the game.The goal is to beat the dealer and also not bust with a 22
            or more. Here are their values:
          </p>

          <ul className="lg:w-1/2 lg:mt-4">
            <ListItem>Number Cards:</ListItem> The number is the value of the
            card.
            <ListItem>Face cards: </ListItem>The value of face cards is 10.
            <ListItem>Ace:</ListItem> Either 1 or 11. It is counted as 11
            (...generally) unless it would put you over 21, in which case it
            counts as 1.
            <ListItem>Therefore, </ListItem>
            an ace and a ten card are 21 in two cards, which is
            Blackjack/Natural.
            <li>A hand containing an ace is called "soft" hand.</li>
          </ul>
        </PageWrapper>
      )}
      {articleNumber === 2 && (
        <PageWrapper>
          <PageTitle position={"mb-8"}>
            {articleNumber}
            {"-) "}Learn your choices.
          </PageTitle>

          <p className="mb-4">
            There are two basic options when it's your turn
          </p>

          <ul className="lg:w-1/2">
            <ListItem>Hit:</ListItem> Get another card. You are able to hit
            until you go over 21.
            <ListItem>Stand: </ListItem>Keep your current cards and do nothing.
            You do not receive more cards.
            <ListItem>Taking insurance:</ListItem> This is only available when
            the dealer is showing an ace. You place a new bet that will then pay
            at 2-1 if the dealer does indeed have a blackjack. You lose your
            other bet (which would pay 1-1) but win the insurance, resulting in
            breaking even. (...generally) unless it would put you over 21, in
            which case it counts as 1.
            <ListItem>Surrender: </ListItem>
            In many casinos, you can (before playing and after determining if
            the dealer has a blackjack) choose to give up half of your bet
            without playing.Surrender is only desirable when the dealer is
            showing a 9-A, and the player has a 5-7 or 12-16.
          </ul>
        </PageWrapper>
      )}
      {articleNumber === 3 && (
        <PageWrapper>
          <PageTitle position={"mb-8"}>
            {articleNumber}
            {"-) "}Start winning.
          </PageTitle>

          <p className="mb-4 lg:px-16">
            In order to win, the player has to be closer to 21 than the dealer,
            without going over. If the player goes over, he has "busted." If
            it's a tie, it's a "push" -- neither the player nor the house wins.
            A blackjack is when your starting hand is an ace and 10, or face
            card.
          </p>

          <ul className="lg:w-1/2">
            <ListItem>The dealer </ListItem> will go around the players until
            each one decides to stand. they then play their own hand, which
            determines the outcome of the game. Obviously, each hand is
            different. Generally, players using copy the dealer hit on 16 or
            less. This is a bad strategy. The never bust strategy is a little
            better, but it is still a bad strategy.
            <ListItem>The casino's</ListItem>greatest advantage (the "house
            edge") is that the player has to act first. If a player "busts"
            (goes over 21), the casino immediately takes the player's money. If
            the casino then "busts" on the same hand, the player still loses.
            The dealer is the last one to play the hand.
          </ul>
        </PageWrapper>
      )}
      <div className="flex items-center justify-center">
        <ButtonComponent
          value={"backward"}
          clickHandler={articleHandler}
          disabled={articleNumber === 1}
        >
          Backward
        </ButtonComponent>{" "}
        <span className="text-white mx-12">{articleNumber}</span>
        <ButtonComponent
          value={"forward"}
          clickHandler={articleHandler}
          disabled={articleNumber === 3}
        >
          Forward
        </ButtonComponent>
      </div>
    </main>
  );
};

export default InstructivePage;
