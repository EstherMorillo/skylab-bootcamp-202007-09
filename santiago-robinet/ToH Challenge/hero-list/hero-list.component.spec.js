describe('Hero List', function(){
    let heroList;

    beforeEach(function(){
        heroList = new HeroListComponent();
    })

    it('should create hero List', function(){
        expect(heroList.createList()).toBeTruthy();
    });

    xit('should show hero detail when a hero in the heroList is picked', function(){
        // expect(heroList.showHeroDetails()).toEqual('take me to the hero details page???');
    });

})