if(document.body.dataset['presentation']){
    var HERO = {
        resetDb: () => fetch("/api/resetDb", { method: "PUT" }),
        getTours: (date) => fetch("/api/tours/"+date).then(r => r.json()),
        getTour: (id) => fetch("/api/tour/"+id).then(r => r.json()),
        getToursForDriver: (driversName) => fetch(`/api/drivers/${driversName}/tours`).then(r => r.json()),
        setTourToFinished: (id) => fetch("/api/tour/"+id).then(r => r.json()).then( t => {
            t.finished = true
            fetch("/api/tour/"+id, {
                method: "PUT", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(t)
            })
        }),
        deliveries: (tourId) => fetch(`/api/tours/${tourId}/deliveries`).then(r => r.json()).then( ds => console.table(ds)),
        alreadyLoadedOnDate: (date) => {
            HERO.getTours(date).then(ts =>{
                let allDeliveries = ts.map( t => t.deliveries).flat()
                let deliveriesCount = allDeliveries.length
                let deliveriesFinishedCount = allDeliveries.filter(d => d.loaded).length
                let c = document.createElement("canvas")
                c.style.display = "none"
                c.width = 1000
                var ctx = c.getContext("2d");
                ctx.fillStyle = "white"
                ctx.fillRect(0, 0, 500, 500);
                ctx.fillStyle = "blue"
                ctx.fillRect(0, 10, 500*(deliveriesFinishedCount/deliveriesCount), 100);
                let pngUrl = c.toDataURL();
                console.log("%c       ", `font-size: 100px; background: url(${pngUrl}) no-repeat`)
                console.log({deliveriesCount, deliveriesFinishedCount})
            })
        },
        console: {
            h1 : (str) => console.log('%c'+str,'font-size: 20px; font-weight: bold;'),
            h2 : (str) => console.log('%c'+str,'font-size: 15px; font-weight: bold;'),
            img : (size, i) => console.log('%c       ', 'font-size: '+(size || 400)+'px; background: url('+i+') no-repeat;'),
            snippet: (str) => console.log('%c'+str,'background: lightgray;')
        },
        logo: () => HERO.console.img(40 ,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAuP3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarZxpdiQ5rqz/cxW9BM7Dcjiec3fwln8/o3solaqhq/vdzKqUFIrwgQAMZgDoZv+//znmX//6l3OhRRNTqbnlbPkTW2y+8021z5/nq7Px/nv/hPdX/Pzb6+brF56Xwq935v2+v/N6+vWBEt/Xx++vmzLf49T3QO8vPgcMOrPnm/d99T1Q8M/r7v3ZtPdzPX67nff/ue8hrHsP+vPnWFiMlXgxeON34HX+rTpL4ApCC52v+jeE+yb+6vvAvymEP1878/Xtj8X7+u7H2tn+vh5+Xwpj8/uG/GON3tdd+vO1uyv0/YrcrzP/9os8/bDf/3xbu3NWPWc/d9djZqWyeW/qcyv3O97IQeKzGpm/hf8T35f7t/G3cosTiy2sOfg7jWvOs9rHRbdcd8ft+3W6ySVGv33hq/fTh/taDcU3P69Rov664wuGWSZUbDKxWuBl/3Ut7p633fNNVznzcrzTOw7mrh1//DV/9uJ/8/frQOfIdZ2z9WutuC4vB+QyZDn9y7swiDvvmqa7vvev+eY39pthAxZMd5krN9jteA4xkvvlW+HaOfC+ZKOxT2i4st4DsEScO3ExLmABm11ILjtbvC/OsY4V+3Su3IfoBxZwKfnlzME2IWSMU73OzWeKu+/1yT8vAy0YIoUcCqYhdDBWjAn/KbHiQz2FFE1KKaeSamqp55BjTjnnkoVRvYQSSyq5lFJLK72GGmuquZZaa6u9+QaktdRyK6bV1lrvnLRz6M6nO+/offgRRhxp5FFGHW30ifvMONPMs8w62+zLr7AI/5VXMauutvp2G1facaedd9l1t90PvnbCiSedfMqpp53+ZbXXqr9bzf2w3N9bzb1Wk8XifV/5ZTVeLuVzCCc4SbIZFvPRYfEiC+DQXjaz1cXoZTnZzDZPUCSP1VyScZaTxbBg3M6n475s98tyf2s3k+J/ZDf/V5YzMt3/heWMTPda7o92+xOrrX4zSrgGUhRqTW04ABtv2LX72pWT/vHXPc5289Ska0tnG+9GXeEk2/L2vCGMlFt1o2SWbk1QjrsKM7u6Si+HuAfd+DLxB/2U+zpcbzYB8A0lzZGKY/lbHC0nlmOFSQT15naubdtAah984DmKtfcg/HOPQ/49Jgd9s2Wd8+fnek/V7mt12QOWnt5SCpOfO4t4al340cYXjsWchU8mu8Le+XQiMY6esPWoBZdYPbk1hq+7+O7HJMl0Ha2uVE+IhSvCPCk0/it+1mc5l7LE/db+06/mb94wRgvbzkU2122lVdJdjwUuHzGA2MN0mMA5rDauIc/gPdvnfpqTbw6Xix0scNHS1LgbURvW3ufXe1nPCkZGVrLtY0p5ztI/ZxmNm149xm334FXbzwxtpYO3dKzbiZ1TCDsXk5v4hfekwmXSAAVS3rOXSt7rm5OsM7Z9fKa2VB57Ecb6il+5VQRffbLYHu/Yu6RsXG8z90Ro4DKtcBZuaAJ02+pb8SgOVcuM+dQS+jh1AE0Bw36/tGU6gRjTDKMP2N7ea7V4XM0u7XYiXh67Ts0d4/Strcjayk0573HgXFos5bbHELtk6ZxZ9HbWvnbRqse7lCfuu5Qfe31WMp2Uu13thN57TG16szjmCqXqMwkk47jlrJMvti47Hvtjocf691gEOlYp8LuT+URNuIrpZeWBWXLpebXOZ2cLgygAUGvJNmZg+WS3V5o7gmwBBsabC3HQthOKJX63DaHpeSMsUY44gKp/78ssB4DHkq3ImvZc03ZKkABbDM0TdFwz5z6k6JYyZuZ+CHtwUjQrjU2c8ktimCUGbDtIBCBjnJkN1+uaHWXOWLoVLOQQ10hzEvcBSOadNQxCYXMpse7hQtlng2FbdjqV/8cc5uwJYhHF+K9fxMjmcjKhPfBTu0bZpYmrbdIinjd4swXmH9BYPu+EJ+OW5uAb4g6OVXKuzhpwJI6c4W5r9NwIPrzKz9knkecPiI+BYaOgHjgzwN1R+jR1BygWFDWvyEUlLn8VkkYg3JrjWCOSUf2eccfh2949kAaiLowobJU7dLjqNNnJL6CnQB+RPeOFzlnyhVTy18bP8SwLhoKVAw+6MedWB+W5MZAdGInmLDxLCDjgrcuPneXTPz9P1n+OwOc/1/D7JZhv1wCHBWQnTm3bSJtkvoHorVSZFogEF/Zrelaurz7rntDdPsjNe8dkWF+P6+yWdk3HPqkgxj5uAhiWWNcrIPfmpaLTAHqcRumF05DHlZybEY12aepUI/WZgZlU/fBCAkgIGNX2+genMZskEXARi0tu+R0a4JA/bsCQmtcf0oCX42Bp7pDMExLQTG43HkuXuhQzaAVXxGISkFTAUSTIGKxT7Fzg6YtzXYsBk2sT+gff3JjklO1NVvobyo4Ag9AWIuBGvxZZpwr064ZnQHBK2Bm7kuyJD3gRSDrD58Dm55H/2YG9a8KtCYbgvgf6Yo6sP07zj5u5hN+D0GGAMdPDv4iCOggRUlOZfZ865WkjAEJFgQkC6JhmKiMUoAUiCKAtuHslZkMeMBawAhd5SYnl3prM6B4z9gZ6pwm2xerh2UtvTU7qyssv074Lm45w8mRCpRVY2siBDLQ6ZANvnrVPUKr4HD0/ZYv5QfDU+SwpJYC2vB0V0RT0rdkAGYi6jOYWoR37UXBwMhtJ3DOUDn0t4HQw2HHWU5An8F+AzFUPXlzWQTJIO8EnSWgeaIzcbQOeWLmcIjwD9If58TNUDIdM/ZIrN04KHiaK6Ank3TaXMl+qhPLNlEllh+driRbyRbwL8CLZ41QzbkxDnSAeY0XZHRJL4hl7ydS4reLXl5rzHDOyDHyylaKgioDpXFBmOyCjBafAZWzBQsKrRmYc+oI7NLA1iq3s+HABDIOnswgeoEPOoKW5An/Q/Rkzcpq5K+bMrP/IsL0QRjlQ9EOuOzfqUodzEFwH+YBHAh1koYjjAD+uVoOUAOV1RYS5lVIv6HvMwxLssQjBNNM1CNgtckImmc6TbwhGbrnPC1ggJKkb/i6gh87zVjcxu5OY9wFT4np+kVRdJAHDMLawMoftuYWwAyfEWrs107M0Q4LLYmvOjoPDnkC+gfG6ckKBZs5hcWdgU3hIWo87DxIJC1SmzwsMMoUEngaeDKserGx3bUO1SCQpDbiLg2zXGPNsi+vlOktYZ3lchgWfcAxAqPvTzeVJBYet2Q7QJzcui9XeUBIC9zy5pLg3F8Tx5BJefbNJxxicxwwxjImh/IzHo9gGyRVO4Ui9Y/Eu+R8w//B9ZM8DO+Rxwc7ZF3YwFlkkkPEe3PHpgzvn4g5AIQi7hyKAVpukMjwdBscqIQFB8nsC4RF8ByLnLObmllBSsI4EaPsJoVzBBj5aJ0vfvT9kg7mT3BaIafJ3QAXiptrIOhunx+J2AxlDyQ5oQmIHFAaGyANN3ZCL/taJpKFiZalTklyEJ0A98c5AOgLkJ74LYYXJpxzm8KuOXpIX1yV0w256AxgZHZx2bW9X8lBLIhdCMaFYlcVG+ELyuE0PBILvIy0oO2gNZQV1AecNe7UQ4rAh5IeDCWUR3/D0mWFCUL9uTUs4jzgaaxXwvXEJIDe8Lu8Hf+yNWMg4cQxSQpcGUETIg3eHJKdf5WCazYrkCfMZ3AZpBEJN9OwYuGZk+7gijNB2v5vC1is04yPBmgEohu6rYwaPQ29iG3KeFit6rMIIsrA8gO6Qf/IvpVTRrApTXy4vPgJ9NwNx1EUCCaqSccnhYxxXPys/s6B2O3A3eDIkKA+bh7LhcYurXCy2gwrtXAyifaJAyMUFbMGDayzbiZRuSCk8SkwYggCKw4O7DVBy6AKRuAhLFp1lakS1UVjzWvk3Hs7K3DMQGkOYrDPEwhlQOS2DuEalAHIpYd6gWhkZf2a/3kDiAULIhFLa7pDF/u5kZiX9/IlG1XSfeJQEV0RKgWO9eMgpMGSH2Opc2doi0p40GKDZB34EU/X8l1XNsagC8rNI92U1U6ZUfYj1nEPECWaxHD4Ob46qBaHXIFSTNxsAzmbbnKLTdum2xtVlhJSshNq3qAThFwgqZyBeYYDl8snmL6KSoUcwNhNyA9ciAyCEUAvIHkkz4BoiDRFROkCftDbiIHssVBBIh6ZXRQ3PJaOm5M21IZczhhACbgsTuBd13dmxEjhswkpzAbfQD7w6wyLnhEwGmAlJeYGxpiKipVY8V0jUHNL+xGsheRHNO2ERXOgEruW2AjqYRoSVkHZIE2liHnAoWWOxJ9EH6yRpI+IDmNNHZ5k8Tkt4efSQyEw+SHGVe3z9xmb2vOQSMnqhkpzZLxtEgcC+9hn51bZj39R9aooNFXYmabNLkh6v4otXWYbfjW7+7JfkyzqCh+TBRrDzhJLjXY7UnrRGJxD8qpvVqMI3ybR6A7dRNm1JTLDidR5Axx3u9R07Hidldfg/eHQlBiDqUbhPPaZxTbjbNs4/FQfi6UrytJ8SCu+HY0FRIPcbDOHILIU7YIpKE9Pfd2PGW1tBZj0pMAZoQ7QqP56J3ucWBW2oQha+qXBALoiwpXwvo4YYYN4ni0DPdpz15DUIKB/2gkSdFUKsFa4oWpWtVQkBK4veL0BDQXIQzrGnS3BqhMH9AGzkKeahv1hnQj81cHJauHsnD3hwVU5BqvKsMzRSRYsKLQGzQaVpl3zbVRMdlCZXDM+yfdeW0nWvqsMRHlmH439ISOXa8bRdoONkngiMkPniDR7IItbIAEv7RkHmLwrC6cbsF384tXBjlwk5xtCIY7ApqHvSgmpWsKVz7QHUQW8GIVdgx/kt4yFphIeEbgZbCnBxszmRbiAe5FHd1FEufT7snvSDC1QpCAcITXU2hnShOFgIgIyHQhM+UEx4gvGpQD9RqcDgUHlgD92Kg19uVBsZsxECou6IutsRkQ7B+W0ndw2lBeRtQkKguFUPL8mSQBGFQrZykS2dNslDNWF5oMnpjKLGUVW8BVUHiVSITVzXMgROw/gi59uBHPXKrwN3ekT6cE+9yN3KKSnNqtAKnPf2VTf1QLHh94phMvyNrqjgkozmPaTMo0SO43YVaSqQ4Dx68DUAiQ8VAedVHdVAdbDEDAnP+SOhgsu7BMITCEiSKQflZli5uht5DSYn1gPoeUOyHvAWHK6urHKzLvQpTKNJXO3ka2h8sSsf91b04Ei4JaaVxFYZgJBAHa3fUsTq+a05fHJEzLfmMMbDupNKDg/rJsfuQOIEY5ph/YVF82TPxcK2dbH/RbiY7/Hyn4QLmXMoYKrPFcVXjJpgiwiBtj08+Je6G0AAuVxX4ROk1z5lDNAbtEJEY62CS2bkD2wE6yMbthhBtr3dj3H6J93rwNDKcF9F4apekC7+Pui7tCb11knMjqLYANoEYiEZgDGkgeCAEYBd9+oi6perxr1TjURuhSJkiOWqDbVP0gGVDa7Pmq2Iw19wHqjfc2+i1rzhsCoubNUCofww46B+bJfKizWsCgd0aXGNBguAa9x1PWk8q3Dy9XLcL9ftSVVwgtYj/kQQgKxkMbIqjo+PoZ8SWdEPQ8hx82pMkUtvQQbSuUi3pGx4FgQg54jmyajDRn4l2UG7lipXh1+QG1J0fSbTpR4nUhNM2m6qgGiV8CDcIu9HfdfSEGjIVL4LcDpy91FLFs91owXvUDjFTJUdM5BN4gxCn8OCK1f7lWGxQVSX4EhqX0CV0cRTTZ+pvppjtSEvsLJ+jNxXuo4lraVL3FXf41OUH+7RWcgVVWm08tjGZVIxHL3HZlm5BqFLPgO10ApYGUd3qqYmsU7oyrI4OwRO2JugWNB5x6/3ROvcTiBauzT7UedqZhJeYM2CYYYs4Qyj4rC/a9ySftO4GOCHxq3QYz7az6UxNbRvyBXlRr+QC+A65Ttw4Yv9C7lgIwDR4Qjb/cg8Qttfqcdvn+oSFcc0EK439UBDuU5AvBouDzrvlWkOjAHQAoaUJxDGENSy4aHw+yWCGZW7AqCG7QhxZUPbcz4qk5kDq9437KAwTjIljwCCcshKZE3yeqgkF64LpIOqoveqQxYjWHA4ogooJYqNisnnWw+mZl8W2EViIVcgJWAqEOT7jkR8Xu7kVcu4LsFHEsloeiNEQxYgGm9780SPgxP4TvXSzO0D3Lu+HRwiu0gPZa4SRREkYrkMyH838H5vST5gZBjhcHsTTkkiKAeoB5VQZuQ+go9Imymry7J8uoWKzeJCwKd0ktlwd+43k0Q0ZtNuHQIKDqlWqUUMecF54aVkXAQu/oQTZjS99Dg0D15hMyTCR7ABJoYrlSvJrE4wYyLvckn4S4MX4FwAlXrFDSULOSRgcgoT+CMVK50Z9c78j3yGiPmezzY/QZhDJ3Omt9O6cHjM9FE8y5meL71TXF92V/PD7krK2ao2IKHS0RQai5BQwVp4HocdNeJ3E1q7S1km4KCosu41S3RN45vqr0n1X/wFBYv6mN/ABOibrUkGQtLwwQge5mUOHC5yFVp5rK4+kE/JFT+RwF6FRuJ3VXVWmqo3TuMHb9dqyoWPaiM+Gn4rWonys8AxZ0E1+7AAhAR+wR9al8GsZprgRoB4B0+GayyxnDUR/YiyZYoIZTjdRdw3Nyje0XH6FWX2U3FFBVYY9Eae3mShsifKX524UcSQtumszPA+BXwUWeEk3IG4S68QkJeYLptYWhUroeF3BADER/tZXImAu8UoU/Qelh7fwxipVSnbt4E81Wzbp0wgD1jJeEfwjdvcy7JKBEdideGT+LoJrDq8EdQgCYGpSW6jUjwxQcpqJCvMzt36TqxCI3bvRJNSIYEF4GPgHPo2uR//HKFgy2HvEcjZADlq7UkTGzYBbrKU2E0cmjyIp5OMVOkgaYKkJuLuDawKLC74fhu/MKOEUK8wvRFVCVKZmjhEkdw7uv3sQeDgzPsyiYTMmiyzdEm2jqth/QBi3si1k+nImGtpegqAgpQ2Ilg9ZagYt1g6EI7rqMPXDHelZOvVTcKKYIAoOsLXsXa3Ns9BLPoduBrCe6gUTLw1CBzgyI2SSfcc+FHXgVj7QSpft5Sp3L6yalKQDvLaIDjLl/6CppMetxIBsaNiaVFeAzXgl2MEAA4fUEli/SpJXGYEPi7NOUJttiQlS7LXHBEMiRER7PJp0TjBOVgs2yD94mVpU0lRBF3hRM7GOqQodHMWwOXYJK/zgmvlW5RpY5hedyCnjLpZDmVLEZzqiVnEpo/tBfsk+dTiFnBDiogr3qeUxpKg9nM3BxOyhlmDYx1WgJaBhk0IBH4Omvt0h/ASvJK7H1xEuDFkVbvWYTcuyO2SRTA1rqfBmfuprvEQ1hK+CJUcC3eCx6t+P8F9vkkXb6ZoGTwpapoDtzCVdOciCwQK7i1/U++0kRJvdutRipLAbwMIBhIy+aQil4VuYyGICVxC16uerdHTTTiQ0o8EIqTOeTjlUAvhamjSEwyTxW2fSuZ7dvUFVMbcyZB8bwliVA0oXKm1iyol67ysu0LVcCOCC0hXayDr0Ecpz+ICkxjFiEZtfdS7F7OGGDcRpXKa6jMiaX37Q9qHeEAeoTuTSDgxwPpJmDAKkGSAirXess/NudgfYjTULo9FvB/rHpFO7M0th+2ecRw1KyaYpHEHlJLTUJgFj0hR6XbqPRQFrTU8brH7UGMcGNhzqWpHplGDBGMTtkHTQGpesIKLJD8OTMoUSFnYMLvKB2F/sJhi56PJuQFyvZoicla44ZCOQpx61bK/5pbWJmmZR4lqcCk/Iz0aXPoIUXzPBbI06ZWrUkFTSsl+aFCDBi0NsfW5TYXkBhg/fs+7m+jZUnKGrHRRnkGYTgvGD64bZ3XqeKgXXZ7WcDiYeTTUEW9st+LiJxRpPL1ocuYlnCM8vWi4WSNPDtF6FKxTqV2EHn4DI8aw04D68/HzO7XUVP2+5Q4VxK+f40OozICXcrr0nT6jEfyHPZtLn1VQ8DDqNnwprLeY54OP7QQCHEQB+oPq76LeEdh3WmQSd4BnzsgaTVBGg5sDfXg0MKV6oS6WMF7YFzyCbihEsSx0tIWEIRUjtcH0ASH1SxE1m2sEhORq8Qi/DnB/7rAIYbyCBz+6U1dnIvNKF5uA+rnIWoQOwRtqortqQAK1zIivAnnpEsUVujrCk/hmbvjyWCoJEcAj3LJoSpJ4qaoXr4kaEAAyKuKRa70ZXBNrVx4TAMD7hPdJMCIAFtkDqNEcryZPi5UEVKsGkIIXLENcsRrcCY4EgVE7OkFvNNKshgm8Rng+m0pgJCBus2g4Iz6TBZ4Ve+YJEDVP7R75XG7VnrOog3tQareDm9QR3pXfZtEIKKqP6BJQEdfg+FE9ciQEZFy3Y49GW3BsEojEUsSh4BILxEWdqR2iiVr1y90J0DTy0CGHR1VM4aidoAXBZn0qxJDXLHbFwbGL0gJnIfhhLFmdUTImkeLUWiSFFGCnSue6nks1OUQWRxdhpRIjIYuUQoc7aUTYJASDxOFbDypKWHGkyTWR8cuAaq81myie8TNGHJOUY+Fa3NYbFoLcrC4z5Bh0DkvVoNVUPSXtDRUzlWAI99sJKJCItzrjbyegrac68xRP+9Wat3aKI+10uD0cTMTIYprlAt7XNCG2DdYQQbHlKWkReWCeLxJF6uRV6EWt++3j5dvHA8CgE3ga7G6FKCk5ybSaYXCfsj/v46Pjcm5PoKrMCTphGwczuBTnUfMfLR/h8Jpzgh6r/6HZz6D+h/we9wyaaIBdtH7dsK/V8s6fnhwsmIWzV9ZunXu2A2MjbUBLCS+1ckq+8UAK7kUt65F9K2I+Qczn9j8v85mXiV1tEiVOgzVRFYd2iydyDoleEg4Rr0iGWMOSRIH4jxwLN41QL43ues3sc5SgmgOS15CJxIKgD6iXm4kkGslEtZKJ8EjV365mVCYCCgnfWymszyiWLpm/wTyjWCzh14hO1JhelHTFHW5pLyBAnhYDfrsemdzf/kQgbxyOaWyaS13SZy5K+zHm1qyvCryE3FMbI4k2smhXjwVw27fNioYsWedFUTZnSOGSl9jfRqsGTjgwuKDJjJPwXU1/+ikiVMkRJAF3hzKcamPtQVmB7DJeJOgcDVBDHraI0Dnqbjz3M6s6qId0p3JwdwDt1LTMEVo0HFvUALjdZl0MyhFSHjc5gQRvPfQ9CCOyB7whacQfJz74HTJXyTOhXBA0RLFEBGiXjUv+1kDUrU2ikxluoNMO9LJdZNY1IUSIWuBEJJ9jXEq7RGaLK1Htzxnx7Kpb9OpRTk+GIA+eFES7IBzqSQKY6NFOrrYwS3WnIgwZ7cxCa13lpwmEPG1WoKZf8FBF0XqVTgCm9ZRUH96myTBENVxLNGenDWyh1LEkHAp2YzL0ZZPSNHwcQtJEacb/NiwXfQAGRPVVMTQSSaPW69NrvP3ip10MZz8GZYnP9BjJhCyF16xbmJoYzbDnyu1yEe1EL9YBDRPmELsv6UDUvQFt/iqix4DtSp7yMU2uW86FZNagCzmtzR3rk9M0RYY1zRZVhF0J+QFjPAPmMyQQ8MFMsNVqYe5Os6Bt7zd0ZBENnt8PIZbA7AvhvOZIzhArzUX5ekeJ6iHyrppERAbewF1tNU+hCpAScRplrHRdvRvteVJlguuslxyT4yIpFB/LmtQh24A5xDgLEUKDX6BMpka/Rq8oYAlOtKoF/HFACbDrjhhp5A36EN+E4FCNa7wE5Nbhuhz+5uPz+4gT/OiOO1fVI1B5pBKUpePaAW34UNC0zhPXWiZI3Gc+pJ6SoxSYvQ4EHnmp/oKcVoNPJdSiONdehCRG0D7DvrcwDN1E0w7NuMGGTn/HeSGjqARdh7esEdTsdjg/Dc4KFJYNjEes7gdiVZUskFhctqlboHr2U/wwz4zfshLyuBp8si28gMCKVgtNRgEY5ZR1iObdWnAMeJWGfAF7zQvE7U3yOf0sIE+rOnQvmmmRqF8kYCWHpj7w7Qb0dxrqUd4FemG4NkJf5dYVsgO6hwblwJpUQYo6rEY4gBI0oYNNXKqtRg4XULOGTEBlcLXC2J7hbTW023hmIXx8WuJ8RB2XJeExNDhR4bQtbRJTvBQEILXEj3iLEXH5AC9XRwqaqtTdSW1RRukm9QLeGRZNlAAQBAc4AdPRCMgdozPi3ugG0oimivKdKrqECi0QrFo+mhBOMLalqhJMZN6usIivcgpQ4WEc3by1CTKoGs39SdAJZO4tqQ50SxPaALFvaQIfXSwf2QhmAMxq89DUTLYBem9F6o5bX+ffmhBVz8YBPyAxgL9OAzyl2+FnAals33HZE8hgD6tVaY88iJsBXmpyw0QedjtObm/HpthxVY29jJUFrwAMd92aaq8FGlWVIBX/U6W9oIskDMpbOIgI965tfYj5mquGI1HsR0hJFK8t/ATFoQrACJJuD+3rq3ejQTolXlkFziOFNrIRclU0b3ldQyPnj4QnJT/my8K2Yfp6hj7/DbaVML/pcTC1sz4sErJSyBG7wTnU3kERAWnRzyYSq0sklLa6FQ+LaKQn74DSpqkgdUSixiFUDW4arHVGm3fU0MVRrkJRIRt1CYgEfP+QTtXWInN1mDEvVhw8dbA3fhtlQryb4iER7QIbfLhpKDh1jAJnA6PQda9VGnELf8k53F0XoiwHBJ1CcztSNsfmfNMV+QNdpl5n1OymxWU8KL8BYNTD0WwbAlleMjQD+aVwVUVYuRuNaTpNnQuwxjNWTvK7fv2UANv1a7EMHBL6pzFb1JxGpgDEPLZ9MLv8edSH36J+/GXUf4L+alp8udT1FYpQf3tLsOP3KiHaq3wvEr5U+SkSmhuKaP08EYVwuSjJ8hktlcTPn5GPT4csf0Y+ng5ZekY+zDfZcicwPg1AMtfvLcCvBmCSllO+ntp8JRZ116hD+X8N4rytYM22PO94fv35ZXkywXj27STLWkTxM+SxiUTe7RVMh9AmcKFgiMqohgu3ALrboU2bluSEhbJikxCBRWqKw9+hK8BhmEEuDx7uBvewzZZnJncvrAqV9CrA3YGMruyWNAfYMmhfNaxm3e1VEw4rk/s9Br8T1XxMl5e0Vc3f0bMKYwFO7XngtGsKGhQl4Uxs1FQ1LuluakwG6byaNhBFXKxCoFVLwlVJop9+vTYg3nV0b3Na21vQ2gj5JLInnFlmqLMeAgxXYwKFq1NbXiRPnbOsypzaCOhDTQdCkTIyFaT2SjxWQQ7iQXCNBCOMYPCjqqcE1Az5gWQyUi3+q0Ja1eEk+4jC797emSjvb9fsmKqQ0FYBVQmfLga04iryt5f3o66ouml+tBLKsXMDkKJSzFnKQuNNC9p2UpQWuua8/YGKwXos1oKjaceeBL+HZe8OZS54XxUXHSciIdLUKD+8mty+sneYfmkHG76ngRYhNHzvOi1xI/kzbwaTSCeDkcc41TFwnOGyovBSOxCrCQyGzvKqNc7ZOAdsz0Z1bciiVTtdSnnE49WOZmygWTtqx9CGfNwS5wMYLxdYdzkun0oKF6eYsxpJD7e0vNGDDV2zijNkukiGnzVpCKq+W4/q3WXAVdZxb86DNdooWsS5bg0G4lS8VwsPMslnzDN03zQG9z1Ajz4IbtW2fNbvtgZIwFJwX9viWGdY3JsLPRFpLFoGueqkpJv6OSpSa4RDBHXe8CjQUlk4hmcuf2lnzjOY/6usY966zsRtVJ46z2RkFi4Skk8BNz5TkZrJV/9bO7vKU1FzOGm8JTUDdfQwxaemdnuFt6aG9ElIzIJygvHvqnnqcPeLXcqoOHu7qW9x1Kx3WK48xVG3rhb7Nvcp0JzKFfcgtnRIe9e2E5ldMECWZ8UMKWlP1O2nvgsfRmo9m1SOZrYclxA+mfNT+3oz57tIypwm30V6SnDl/2M0wrzTRNzOzNhayxk0aH4nrIXHGmvXvjR3h89OVDsUtYglx0raCEwKdY4D3SmHWdfXwLGgrdm7I8ir3tG104osGDSxouq4pKLmmLp6vNrIj848CD8Q12nyF24TM6utJ22ozleDcqTt3FsjejFQ52bVxUaZe5UhuQuQQCMvuRhyZ0Q0CAqSjJpB/PZQVj2HQ+S4a0f2/c1RGZ1VJRPBq1RFEbvpXHeHsaE2jsbUIPlNA50oVuScBKLTR6Z2BOADVhWTVLUdluvU4zVG82no0tVWNpB9JQu5SShXnnzUiTr3v4kTDJb9Zy8TqouVm6QDpcBwzLlbL+wrtuJIz86080xFgbR9aLMKoJi2SqQQPLRpVkEqq5OFgwIekFHY4RhqyfW7SwLmg13THBOzJbIANtFVLizJH40/bP4nJaNhB/6pwi4srRk027GLhBOUwTGs5Nl+Kagl65J2D3E4oH/eq5lP1g4J21UiVHVXPgrJMTe+J+iiMS7NkS+h/ZCk1YYueHJsN+0DD+C+V78YZs/t3FnNrx1dqtbcoaZgYdsZEoBd+tJMd1tiACo2eWg51HIGWEDdoA/LdpvoUcG9uLSezF0rrAO9UjLZREdWgTOJn0IGNPiANVg91dgvS2YNQRhw9g5nbdYNXmqAPFJ1hh0PSLz81t5dcRbtopo5Rre+axTEuyEXxGky0KQsyPH0wILmZuDWhjYbahcGmt5qy4Q+613UWuPc+Cq6mSs9L41oL40oJyiGdPEbzmF09aKqunqFnIZMVHFWEnXcLPqiLu2agKHgNHeGS1WQccOg35IlmtHBs6tov4rGca7gJa9zrkTOupuZwLuuyYWnza3Ckfoqsk+v4tlvHcwS/fCwrYNod5N6I+pTsPykR7mgYAa4U1Dceaq7TzPq42LraiGrJZ+XuVAlCNTOJWx9WdjtGKm95m/vPt722tO7v/trK2GvTiQZZDrx86xn+4jVvYXc9quQixN5UditQmJSkySK6argpaSPKNU2OF8/qG0mrqtivlRoJsK0fw5029phI8ng3GSBEJi3+eRFEOMztQE3U6knBW2XmwaUgZdfcqR+6I8Npvgytw7JWNpSVrzmRdyNDg0SFxFM8qaaCkbdS1YMCcYiqoO6LIseVOH+k8T8rd9CYg5IQpLx3fJotM873T2PePzWMM1lI9quQNrE+/FiPa2DiO1wrGFb7Pt5agy6d8EwB+aOy+SeiQ7WL2osVH1mLl1VDYzlZTZoP0ykOdHpFuD2n9L3vK3vBDvCSUlHtYxbZ1N1TR9dGk6x6iLVettB/bOpz7/dIGBAE6DjGXveuB7MyZChPko+cj0VSqVkEjTtoe6AuOLMaomPOxvJ+zWRrAcWkIbgPlad70GshX7nv/B8Lotj//1un2c2IMtJALKoZt6GGDfAX7PSmnhZ49liu8Kzw7a8O2yLngjgDryhznceyeqRCJi6qSGIM0AugJHc2jMdM6LtQzMbdWp3Rn82XMs6KYh/Ilq66mFEMYeRa8Lt/bPzJ23zVDm/XeNTn3n29GnX6P6rd3BCKBIwr3p+MXXDu6Skm1xybU2Cfisbg1UKlDuJebcPTV+2LNo1r/WM0cEeQjQXnDwXPMjHt2rQvx70oBY5shzzAnFYCi8l3XlFedMuH+dIrnpADX5qQru7jZpacPOO3SNe95Uj5Ag9jiXFcgd4Zhs77vuMhaTFDNq+BOBo/PAEc58N5jTbjiZL6U6ai2FK+9Xp4Qkci3dGJUXYDXcJxHH3wmIR3DvIm5LhzDBu+KaDHc7FG1W8zTnePbkodT30AHArQ/u0ddRKwlZvB3LgOnT5aGdVulbz90ELU5XUju3RrVZGgcPZuNQbI27DjU5tmcchtwaJtEkQaHs3CZqtAWN8yBHeMPa9P8oNBGiKpK2qrTqdYGrWJmyoNCbW426ezRY3UJxRxfHJEqtVojhru7LGdIEmIZUesUXwASUdQyxS4n2uwWBhb5hpUHLASc0zKZk02lEhB3royVNlz99wYOR8a1Haou1VoQKAz+W+Vo+/gb3qORF/jC6lbm3L4CJqnAmiH1WICyt15Y6uaeb5bDP6inDzhvjtEz11pPpssvubTa8qoPwMc/NbnI83ws5fRlhBACmoFWSLfK69ENrfVgw5glNLzahk5fC2iKCwvwDfK1vdJYG1adeEAtne0u73JTF3TcDfKozRSl+wJqSFG7buCA7dZ1d08e5vY0p4NukfeOZ4oXdzNMJzEUCpHOXbFmm4EARezacep2bWtafnG96L7JUmlyWyeydrQbSgMl2zt2jhq4Oq5zpsTllPdoC2fTpXGkiCIeMAKAo93qb01jScMlTIaWbhJ2AFvGH4t+ll371yylkqWlQFvqacW3qLHnzi52NRzNcLu4aIr+P60JO7eR4uy59m1fIXQkzrLkSoqJtS9Be1uJUWWSiVWAFj7egNt2xxNO/zPFxmvnRPO4bvLCRC9OghI1cb7Lfc0fVYsNqNwymcnjDQFiFTJyHuEQrxeeqMH4//qJXKtfYFBgvMipuSThqdttqsOCrqSDnQS8AgBOzQ423KR3RBrHLnUoR82gGu9qyY8oJeIP0ml5D1NCVAw3wbdSckUFV14Cn9bvrndsWl9IgH/BQDkbEvnKmgHPr7eJGNFl7FhGfb3tKAXRXljBpUhvUVMhsmPBbZfW6ye4BKD9fSkzpIOSr5BEUP12KezoWeLHUHtULqqicSuGjEpU3xqvkDKehpPdZKI4P4E1xf1ddQNeAGLqVqNASvDZHSsyO2qAFOScP7wAvtIFiaTtWNlhhe3M9Fj3tZ3Gi9D1ri0pyBNDYpwK2Sgtj87CBrA8CPOq8AZ0YYw0Wih67B97yeOqAn5WjXaub6wJMwEwh5coHFuI+DqeRkRbdZS9DzPkGq3qdCdY0SzvskIw0XXXe7zialaVLSOHHQhd9mhhg29LmQsYKGqdUcDlriNRHrrI1FlmgMV/J9hcQ59eyvZZqKUJPVThNxuNVtU4mO9dVAk7Y0snoXGQDGhCGE+Va96napJukRj5vTKLx1Tu2OCw6y/cZl/Rqa+mfP5DKfb65bxKj6R5/i60175xPMoOpJns/szSz3CgC5rKGtHvWcDz1NiLymXbskvzXj3RLe1Ot3qgc2HEn7EJLKzEUPV1tquQ9N5nnyIHrKE3IrWy1xNVNP2LBo09xrdMrQQY19YdEB01hyi7asOWmjftUEEteuMXL8BMS8Tw9y0AOzVdjRwhZQWBXIHuxaeo5FIabQn7CPqUIW32gWXbVcwkiPcdDD6bQRWRYcRo89kTzP70NFtF/gq5Dd7mYrdx5fuWVsPapElaPJAdZSeaxf/mMUDSJA/FId3qCrIVS8Bi/FWdAn6m/sodLH0g4xXFkPWdLDULLf3H0TIJtb/18+3akI7dJCIHNgDRQvXsYIOqGqTXp5RXULul72L3oNoZeeOBA0FCK+U0axjiSRf4wRki0qWi5pHrOcrELSnhmjQCRXqISwU/RLH4KsaP8t/gkyaN/eXeIvvpcRBw/A4UEtiXuRJZzKXRPFlbSbylj1Z7kFxM2tnyZyNEgxX4J4t7R1rRQ0PZEnYTzaWHA0O7ZbvsM1BVg12k3VNV7jQOHw4q5/9igfMmD7h08NNH/8xX4ejuQ4+juNqPbgBzDqFQV6fN7TSldJ5ZCbzBPoetRdPdphH8/TSMXN0IEbw4fHi6oezAbHEbF5MxVUSUN64jLZaAa8aVJ1a19FTR5VLZl/O+lFAxB+RJiboPZ5skYLTjtnkLwqDlWwhmNV8/ozqinUr2fL/f7V6TGP/y50jB6s2P8QOk44gJglxMm42mCetAWXQN16ygpWE1k/n4VsWiP3leerNqfHS3DVp7+znmThpkcrHO3bep7F+ByTmPt2VD1BV1kA0oioTX6oaOFUcEzSIT8wNS+XOnSarKHOV9Zmkgo/KfCyxWLfjWZ6kMjL+aF0bvr/9NGT5j9/VuV/dyAY0mrmfwGo5p6KIlGLXwAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB+MJHhQhNSDRWz0AAAdJSURBVGje7ZlrbBTXFcd/d2Z2/eIR7ECN6iZbEB8rBaqqKsKAido4UJsQJ5+oEHhLEGCzoAT1A0lDoiqCWpUwpqRxbEiJSJVKFV1TcFNaSNf91g+lJEgJCGxqHi0Pm+Bge70zc/phH57dnd0dG0ipxJGuvL6Pc/7/e8859zHwSP63ou6nMjkVegx4CngyUXUJOK1qWm8/9ATkVCgAPAesBAKJ6j4gDPxe1bT2PbQEEjO/Fgg5wOMg0Qq89yBWwvDSadmGbRRFoxiGjq4JNjoQo6t9f7LLUxkz75RAou3091av/vhrRTPANsBvEo3GMHxFWGM+jh+aCuy8vwTqgkGUXYwdMwl3tqFpWqpt6O4w08YJPJkDvJPEkzOLy3m/dRdTykpTDZZt8/z6rdQFb2HHNnBuzmzO79x5bwS+vfolZpeUsHH1Czy7dJHrwKllpYgISnn3wnDH3qw6XdMId8brj53sYf/7HzJv5U6Oh72R0DIrFnz3JWb5fRx9dw/PLl3E4OAgSqmcxZFt8gVpH3Apn57BwUFWLKvm2MF9aBUD1GzaNDkCVd8q4viBfQD4fD7Ky8u96DmdyDZ9OcCHE31ySnl5OT6fD4Cjna1MGVWs2LatcBaqeWET0x/zY1oWCsXbb+3g65WzMAwDy7IAiEQiVFdXZw2eO3cuFy9e9JxG58yZw4ULF7L09PT0sHjx4rhL6TqmafKvK9do+ulbiCgwQIZNjh1+2yVQ129BRNJKd3f3eIrMaMsskUgk1feZ6mHZvbFfDr92Vg6/dlZ2b+yXZ6qHJTkJhXQlpbu7O6utbv0W9yVY0bgNEaGnpyerbWBgoKBREaGsrAwCpuQrXvQMDAxk7zFJAus2e4sBp8yYMcNTIN2d+YUU9NVvWgX7eLU34Y0sBcKRMpNLnglMeo0M4GYaCenVlZueyYoGcQOLFi1CRGhoaACgqakprWMoFJrUrBYak6k3abehoSGdXK79ZtWGJq7fvEX/1X8jIrS3t+cM4PS9Nd3HWyDh6+nDnG1ppYCN9vZ2RIRLV65x7foNVjZudZ+QZWvWMN1XjmmbdB1oS3MVt+UVEbQ5dqqhpW/cZbYHTFcXyuwz7m66yuWmSdsrg1sY0zSsS35OnGjJdqGThw5xpHMPo7bNJ5+dT2scHBz0DN6rOMdkulOmvb//81Msy+SPHa2u4NOyUElgJq/+vC2Vh5O7oxN8dCyWNmvO2XQP2ux255jRzy3lXOWkvaT9N1vf5cs7Pm9Hia433gDd4PK1/1BbW4uu66kljUQixGImxUV+V7dxI1EIfEufwcDtL4iZJpFIJOU6uq5TW1tLb/8VlG7x1yN7vRFY8PTTfH5jiM2v/gwA0zQxjDjQmmXLMIw4ocrKSk8kCoEHmD1rJtNnlLO0piae0w0D04z32/r6Lnrv3GDBkiX5s5p/xw6WXLtJifIhApavGBWL8ofEEffmrVtUfeMJRofvMjIywi9LS8UNmBx8GbXuF+43NkdbZty8IqKKSkq5ermfiooKAOqDzZjiw0cMQWGJxfH39ruvwJLe6/yp81eEO9ro6mxDi44QLbZ4rjFE+MQpioqKGR2+C0BpaWneoJxIADslOjKMv7iEIx+djINnjMqKKYQPtNF1YC+6pvODHzW7E9CL05VWznqckjGdmGXR8ZvfMXVKWdYunAuYHHzZdfbzgQ8EAqkL0sEPw4hp4hM/B1reTPXp6tyL3+d+6lH1wWbCHXu5fPkyVVVVeY8QLSBe/Xwiq9Q+b546d+6cq91kllqxdjPHf53tRloyi1VVVWXNcnd394SujJOV8+fPZ9nJ/F/XdPfDnCZW3oGpWSww+/ciLSDbQeWyXR8MYWO5x8CQPUpv/5WH8tmwo6MjsYlamDLiTmBsYCZbdu7yfLTdfh9f8wrpCgaDcVxKYY1F3Qn87ehulKiCS5zLoLPO7DNcSz7AybpMF01OZn0whCk2f/7gg9w78Z0bY9Q3bsm7Ck7jyd/Ov/neD7blGJOL2NDQUHx/GBtDYeH3PV54OWvWhqhrbEqdy2/f9vaMmTrHB0wxwbUQMGXhwoUT0ici/HBdM7VrGr375PLVm6hb15x1yThz5kxav6tXr6ZfQhwXFTfwmRf7+fPn5wQtIry48RVWNDbx/RfXT/x1evnzGzCm+7BRhDv2pL2HZso/Pv2MBXXz0n2uz1Ckb2gZd2Y9Z8DV/7gZsRViC2YxfPTOvsk9r69atYrR8gqUWRQPEl1DiWArUKJQGiACNhz9eI+kgR+/crqSqKsJKTQNsUGUxPUrDTEt0BWKYS5qGmcTKfSevw8EGl/nidhNilQMw2+jWTry5TT6pw3wyV/ecQdfgMTy7/xEMe0OaGBbGoMxgxtRHxd/u+cr/MDhuJi7gs8k0Gd4GzPxZ5V7BJ9PnIe4zIOeVx0PhEBm0HolcZ8/Kk6OwL26QXqgP7ADovsmE889MinDAXO8JMCn9H1VwJ1lkrFz/3U+kkfySP6/5b9qcTkTEvAbUwAAAABJRU5ErkJggg==')
    }

    const superButtonsCss = "background: #f00;width: 100%;font-size: 1em;color: #fff;margin-top: 22px;"

    const getStruckByLightningWhileHandlingChemicals = () => {
        let loadAllButton = document.createElement("button")
        loadAllButton.style.cssText = superButtonsCss
        loadAllButton.appendChild(document.createTextNode("Load All"))
        loadAllButton.addEventListener("click", () =>{
            for(article of Array.from(document.querySelectorAll("#superSpeedFormGrid input"))) {
                if(!article.checked) article.click()
            }
        })
        let superSpeedForm = document.getElementById("superSpeedForm")
        superSpeedForm.insertBefore(loadAllButton, superSpeedForm.firstChild)
    }

    getStruckByLightningWhileHandlingChemicals()
    

    const flyTooNearAYellowSun = (formId) => {
        let hideShowButton = document.createElement("button")
        hideShowButton.appendChild(document.createTextNode("Enable Superpowers"))
        hideShowButton.style.cssText = "background: #f00;width: 100%;font-size: 1em;color: #fff;margin-top: 22px;"

        let superVisionExtraInfo = document.createElement("div")
        superVisionExtraInfo.id = formId+"ExtraInfo"
        superVisionExtraInfo.appendChild(document.createTextNode("Info"))
        var superVisionForm = document.getElementById(formId)
        superVisionForm.appendChild(superVisionExtraInfo)
        superVisionExtraInfo.style.display = "none"
        hideShowButton.addEventListener("click", () =>{
            if(superVisionExtraInfo.style.display === "none"){
                superVisionExtraInfo.style.display = "block"
                hideShowButton.innerHTML = "Hide superpowers"
            }else{
                superVisionExtraInfo.style.display = "none"
                hideShowButton.innerHTML = "Enable Superpowers"
            }
        })
        superVisionForm.appendChild(hideShowButton)
    }

    let updateSuperVision = (formId) => {
        let superVisionExtraInfo = document.getElementById(formId+"ExtraInfo")
        superVisionExtraInfo.innerHTML = ""

        //Driver name is hardcoded, in a real situation we would get the driver's
        //name from somewhere else
        HERO.getToursForDriver("Charlie").then( ts => {
            for(let t of ts){
                let extraInfo = document.createElement("p")
                extraInfo.style.fontSize = "24px"
                extraInfo.appendChild(document.createTextNode(`${t.client} : last sync ${t.lastSync} with app version ${t.appVersion} TourId: ${t.id}`))
                superVisionExtraInfo.appendChild(extraInfo)
            }
        })        
    }

    flyTooNearAYellowSun("superVisionForm")
    flyTooNearAYellowSun("superVisionForm2")

    updateSuperVision("superVisionForm")
    updateSuperVision("superVisionForm2")

    let addFinishAllButton = () => {
        let finishAllButton = document.createElement("button")
        finishAllButton.appendChild(document.createTextNode("Finish All"))
        finishAllButton.id = "finishAll"
        finishAllButton.style.cssText = superButtonsCss
        let cellWithDriverName = document.querySelector("#superStrengthFormGrid .driversName")

        let driversName = cellWithDriverName.textContent
        finishAllButton.addEventListener("click", () => {
            fetch(`/api/drivers/${driversName}/finishTours`, { method: "PUT"})
            loadToursForDriver("Edna", "superStrengthFormGrid")
        })

        cellWithDriverName.appendChild(finishAllButton)
    }

    addFinishAllButton()
    let targetNode = document.getElementById('superStrengthForm');
    /*
    If you want to react to changes in the DOM, you can use
    the mutation observer.
    Imagine that you want to update the tour info every time 
    the tour list changes
    */
    HERO.superVisionObserver = new MutationObserver((mutationsList, observer) => {
        for(let mutation of mutationsList) {
            if (mutation.type == 'childList') {
                if(! document.querySelector("#superStrengthFormGrid .driversName button#finishAll"))
                    addFinishAllButton()
            }
        }
    })
    HERO.superVisionObserver.observe(targetNode, { attributes: true, childList: true, subtree: true })

    HERO.console.h1("A hero's guide to developing with Chrome Dev Tools")
    HERO.console.h2("Extension loaded")
}