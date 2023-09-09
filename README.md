# Memory-Game
My test memory game on html, css and js. 

I apologize for the possibly very bad code, newbie.
It works like this: first, the cards themselves are generated. 
Then the numbers are generated for them. To do this, two random cards are selected, checked to see if they are not occupied, and if they are the same. 
If the conditions are met, they are assigned the same number, which is randomly selected and ranges from 1 to half the number of cards. 
A few seconds after all the cards are assigned numbers, they are folded into a Map object, where the key is an element and its value is the number assigned to this card during generation. 
This is necessary so that when you click on a card, the app finds the card and its number. 
After that, the card is turned over and the number in the card is cleared so that it is impossible to peek in the inspector.
The first time you click on a card, it simply flips over, and the number is returned to the text, just by using that Map object. 
When you click again, the same thing happens with the second card. When the second card is clicked, it is checked whether the first clicked card has the same digit as the second card. 
If so, the victory and points are scored. Every three wins, two more cards are added to increase the difficulty of the game.

