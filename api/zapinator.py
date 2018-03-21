"""Module for coming with zap baby

We're gonna need this http://unicode.org/emoji/charts/full-emoji-list.html"""

import random
from wordlists import discard_tokens, specific_tokens, mood_emoji

debug = True
"""debug print function"""
def printd(text):
    if debug:
        print(text)

"""Zapinates a text.

Arguments
---------
text : str
    Text to be zapinated.
mood : {"happy", "angry", "love", "surprise"}
    Mood of generic emoji.
zap_rate : float
    Rate of words to be zapinated. Each word will have
    a `zap_rate` chance of being zapinated.
zap_strength : int, or tuple of ints
    Possible strength of each zapination, that is, the
    amount of emojis following a zapinated word. If a single
    value is given, then [1,`zap_strength`] emojis will be 
    placed. If a tuple is given, then the first two values
    of the tuple are the minimum and maximum strength. Both
    endpoints are included.

Returns
-------
zapinated_text : str
    Text after zapination, <?>-encoded.     
"""
def zapinate(text, mood="happy", zap_rate=0.5, zap_strength=3):
    # if zap_strength is single value, build tuple
    if type(zap_strength) is int:
        zap_strength = (1,zap_strength)

    # Output variable
    zapinated_text = ""

    for line in text.split('\n'):

        # Split input text into tokens by whitespace (TODO: keep nature of whitespaces? like, split lines)
        for token in line.split():
            printd("On token {}".format(token))
            # Process token
            # If token is small or in discard wordlist, add as is
            if len(token) <= 2 or token in discard_tokens:
                printd("\tToken got discarded")
                zapinated_text += token + " "
                continue

            # Token is valid, deciding if it should be zapinated
            if random.random() < zap_rate:
                # Word should be zapinated. Determining strength
                strength = random.randint(zap_strength[0], zap_strength[1])
                printd("\tToken is being zapinated with strength {}".format(strength))

                # If word is in specific_tokens, get specific emojis. else, get mood emojis
                if token in specific_tokens:
                    possible_emoji = specific_tokens[token]
                    printd("\ttoken is specific, possible: {}".format(possible_emoji))
                else:
                    possible_emoji = mood_emoji[mood]
                    printd("\ttoken is generic, possible: {}".format(possible_emoji))

                # randomly choosing "strength" emojis
                chosen_emoji = random.choices(possible_emoji, k=strength)
                printd("\tchosen emoji: {}".format(chosen_emoji))

                # TODO build sets of emoji (like the "topper" combo 😂👌)

                # appending to token in the text
                zapinated_text += token + " " + "".join(chosen_emoji) + " "
            else:
                # token was not selected for zapination. shame!
                printd("\tToken was not chosen")
                zapinated_text += token + " "

        # <br/> or '/n'
        # set with <br/> because output is html        
        zapinated_text += "<br/>"

    # turning on cruise control for cool
    zapinated_text = zapinated_text.upper()

    return zapinated_text

if __name__ == '__main__':
    # main function, for debugging. modify for release.
    text = "esse texto vai ser zapeado demais bb"
    zapinated_text = zapinate(text)

    printd("Output: "+format(zapinated_text))