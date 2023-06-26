from turtle import *
import sys

wordListString = sys.argv[1]

posdict = {
    "1": (-150, 150),
    "2": (-50, 150),
    "3": (50, 150),
    "4": (150, 150),
    "5": (-150, 50),
    "6": (-50, 50),
    "7": (50, 50),
    "8": (150, 50),
    "9": (-150, -50),
    "10": (-50, -50),
    "11": (50, -50),
    "12": (150, -50),
    "13": (-150, -150),
    "14": (-50, -150),
    "15": (50, -150),
    "16": (150, -150)
}
pathdict = {}

def drawBoard():
    
    color('red', 'yellow')
    speed(0)
    width(1)
    #draw square
    penup()
    goto(0, 0)
    right(90)
    forward(200)
    pendown()
    left(90)
    forward(200)
    left(90)
    forward(400)
    left(90)
    forward(400)
    left(90)
    forward(400)
    left(90)
    forward(200)
    #draw gridlines
    left(90)
    forward(400)
    left(90)
    forward(100)
    left(90)
    forward(400)
    left(90)
    forward(200)
    left(90)
    forward(400)
    right(90)
    forward(100)
    right(90)
    forward(100)
    right(90)
    forward(400)
    left(90)
    forward(100)
    left(90)
    forward(400)
    right(90)
    forward(100)
    right(90)
    forward(400)
    penup()

wordListString = wordListString.replace('[', '')
wordListString = wordListString.replace(']', '')
wordList = wordListString.split(',')

#draw word paths
colormode(255)
for word in wordList:
    clear()
    drawBoard()
    w = word.split('|')[0]
    p = word.split('|')[1].split('-')
    goto(0, -250)
    write(w, align='center', font=("Verdana", 15, 'normal'))
    first = True
    pathcol = (98, 223, 102)
    color(pathcol)
    
    width(4)
    for n in p:
        goto(posdict[n][0], posdict[n][1])
        if (first):
            speed(3)
            first = False
            pendown()
    
    input("Press enter to cont")
done()
