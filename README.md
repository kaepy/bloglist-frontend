## Osa 5
5.1 git repon kloonaus, käyttäjän kirjautuminen tokenin avulla
5.2 kirjautuminen "pysyvän" local storagen avulla
5.3 blogien luonti kirjautuneena
5.4 notifikaatiot onnistuneista ja epäonnistuneista toimenpiteistä
5.5 Blogin luomisen lomake näytetään ainoastaan tarvittaessa
5.6 Blogin luomiseen liittyvät tilat osaksi komponenttia
5.7 Blogin kaikki muut paitsi title tieto napin taakse
5.8* blogin lisääjä näkyviin blogin tietoihin jo luonnin yhteydessä
  - Tämä korjattu bäkkärin puolelle blogs.js:
      const savedBlog = await blog.save()
      await savedBlog.populate('user', { username: 1, name: 1 }) // hoitaa homman
5.9 blogin like-painikkeen toiminnallisuus
5.10 sorttaa blogit likejen mukaan nousevasti
5.11 Nappi blogin poistamiselle
5.12 PropTypet ja ESLint käyttöön