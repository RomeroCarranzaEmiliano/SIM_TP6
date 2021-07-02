import math


def calcular(x, y, guardar_tabla):
    """"""
    tabla = []

    h = 1
    beta = 0.019

    x1 = x
    y1 = y
    k1 = f(x1, y1)
    x2 = x1 + h / 2
    y2 = y1 + k1 * h/2
    k2 = f(x2, y2)
    x3 = x1 + h / 2
    y3 = y1 + k2 * h / 2
    k3 = f(x3, y3)
    x4 = x1 + h
    y4 = y1 + k3*h
    k4 = f(x4,y4)
    xf = x + h
    yf = y + h/6 * (k1+ 2*k2 + 2*k3 + k4)
    #linea = [x1, y1, k1, y2, k2, x2, y3, k3, x4, y4, k4, x4, yf, abs(yf - y), (abs(yf - y) < 0.02)]
    #tabla.append(linea)
    while 1:
        x1 = x
        y1 = y
        k1 = f(x1, y1)
        x2 = x1 + h / 2
        y2 = y1 + k1 * h/2
        k2 = f(x2, y2)
        x3 = x1 + h / 2
        y3 = y1 + k2 * h / 2
        k3 = f(x3, y3)
        x4 = x1 + h
        y4 = y1 + k3*h
        k4 = f(x4,y4)

        xf = x + h
        yf = y + h/6 * (k1+ 2*k2 + 2*k3 + k4)

        if guardar_tabla:
            linea = [x1, y1, k1, y2, k2, x2, y3, k3, x4, y4, k4, x4, yf, abs(yf - y), (abs(yf - y) < 0.02)]
            tabla.append(linea)

        if abs(yf - y) < 0.02:
            return xf, tabla

        x = xf
        y = yf

def f(x, y):
    beta = 0.019
    resultado = -beta * y * 0.5
    return resultado



