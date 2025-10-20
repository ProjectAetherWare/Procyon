/*** LandmarkTalks.js
* set the talks informations at each landmark
* must be included after Landmarks.js
*/


//talkIndex is the index of the current speaker at each landmark, initially set to 0
for(landmark in landmarks){
	landmarks[landmark].talkIndex=0;
}

landmarks.Independence.talks=[
	{
		speaker: "A trader named Jim",
		speech:
			`Better take extra sets of clothing.  Trade 'em to Indians for fresh
			vegetables, fish, or meat.  It's well worth hiring an Indian guide at river
			crossings.  Expect to pay them!  They're sharp traders, not easily cheated.`
	},
	{
		speaker: "A traveler, Miles Hendricks,",
		speech:
`Did you read the Missouri Republican today? --Says some folk start for Oregon
without carrying spare parts, not even an extra wagon axle.  Must think they
grow on trees!  Hope they're lucky enough to find an abandoned wagon.`
	},
	{
		speaker: "A town resident",
		speech:
`Some folks seem to think that two oxen are enough to get them to Oregon!  Two
oxen can barely move a fully loaded wagon, and if one of them gets sick or
dies, you won't be going anywhere.  I wouldn't go overland with less than six.`
	}
];

landmarks.KansasRiverCrossing.talks=[
{
  speaker: "Aunt Rebecca Sims",
  speech:
`With the crowds of people waiting to get on the ferry, we could be stranded
here for days!  Hope there's enough graze for all those animals--not many
people carry feed!  I'd rather wait, though, than cross in a rickety wagon
boat!`
},
{
  speaker: "A stranger",
  speech:
`Can't afford to take a ferry.  We're making our wagon into a boat.  We'll turn
it over, caulk the bottom and sides with pitch, and use it to float our goods
across.  Have to swim the animals.  Hope it doesn't rain--the river's high
enough!`
},
{
  speaker: "A ferry operator",
  speech:
`Don't try to ford any river deeper than the wagon bed--about two and a half
feet.  You'll swamp your wagon and lose your supplies.  You can caulk the
wagon bed and float it--or be smart and hire me to take your wagon on my ferry!`
}
];

landmarks.BigBlueRiverCrossing.talks=[
  {
    speaker: "A party leader heading east",
    speech:
`We've had enough!  Pesky flies all day and mosquitoes all night!  It's either
baking sun or oceans of mud--and sometimes both.  Worry over Indians
attacking--haven't seen any yet, but still a worry.
`},
{
  speaker: "A lady, Marnie Stewart,",
  speech:
`
This prairie is mighty pretty with all the wild flowers and tall grasses.  But
there's too much of it!  I miss not having a town nearby. I wonder how many
days until I see a town--a town with real shops, a church, people...
`},
{
  speaker: "Big Louie, a trail driver,",
  speech:
`
Be careful you don't push those animals too hard!  Keep 'em moving but set them
a fair pace.  Can't keep driving 'em so fast or you'll end up with lame-footed
animals.  A lame ox is about as good to you as a dead one!
`}
];

landmarks.FortKearney.talks=[
  {
    speaker: "A fort soldier",
    speech:
`
The trails from the jumping off places --Independence, St. Joseph, Council
Bluffs--come together at Fort Kearney.  This new fort was built by the U.S.
Army to protect those bound for California and Oregon.
`},
{
  speaker: "Big Louie",
  speech:
  `
The Platte River valley forms a natural roadway from Fort Kearney to Fort
Laramie.  Travelers bound for California, Utah, and Oregon all take this road.
Could be the easiest stretch of the whole trip.  Should see antelope and plenty
of buffalo.
`},
{
  speaker:"A Fort Kearney scout",
  speech:
`
The game is still plentiful along here, but gettin' harder to find.  With so
many overlanders, I don't expect it to last more'n a few years.  Folks shoot
the game for sport, take a small piece, and let the rest rot in the sun.
`}
];

landmarks.ChimneyRock.talks=[
  {
    speaker:"Aunt Rebecca Sims",
    speech:
`
I hear terrible stories about wagon parties running out of food before Oregon
--the whole party starving to death.  We must check our supplies often;
we might not get there as soon as we think.  Always plan for the worst, I say.
`
},
{
  speaker:"Celinda Hines",
  speech:
  `
Chimney Rock by moonlight is awfully sublime.  Many Indians came to our wagon
with fish to exchange for clothing.  We bought a number.  They
understand 'swap' and 'no swap.'  Seem most anxious to get shirts and socks.
`
},
{
  speaker:"Alonzo Delano",
  speech:
  `
About noon yesterday we came in sight of Chimney Rock looming up in the
distance like the lofty tower of some town.  We did not tire gazing on it.  It
was about 20 miles from us, and stayed in sight 'til we reached it today.
`
}
];
landmarks.FortLaramie.talks=[
  {
    speaker:"A Sioux brave",
    speech:
`
The Pawnee are the mortal enemies of the Sioux.  I would not hesitate to kill
any Pawnee I met.  But I have never killed a white man.  All I ask from the
white man is to leave me alone, and to leave my buffalo alone.
`
},
{
  speaker:"A woman traveler",
  speech:

`
Be warned, stranger.  Don't dig a water hole!  Drink only river water.  Salty
as the Platte River is--it's better than the cholera.  We buried my husband
last week.  Could use some help with this harness, if you can spare the time.
`
},
{
  speaker:"A mountain man",
  speech:
`
These greenhorns heading across the Rockies know nothing about surviving in
the mountains.  It gets awful cold up there, even in summer.  Many a traveler
crossing the mountains too late in the year has gotten snowbound and died!
`
}
];

landmarks.IndependenceRock.talks=[
  {
    speaker:"A young boy",
    speech:
`
I carved my name way up the side of Independence Rock, near the top.  There
are hundreds of names up there!  The oldest ones were carved by mountain men
and fur trappers --famous names like Fremont, Bonneville, and DeSmet!
`
},
{
  speaker:"Aunt Rebecca Sims",
  speech:
  `
No butter or cheese or fresh fruit since Fort Laramie!  Bless me, but I'd
rather have my larder full of food back East than have our names carved on
that rock!  Well, tis a sight more cheery than all the graves we passed.
`
},
{
  speaker:"Big Louie",
  speech:
  `
Goodbye Platte River!  Goodbye sand hills and white buffalo skulls!  Now we
climb the Sweetwater valley to cross the Continental Divide at South Pass.
Once across the Rockies, we'll make a steep descent into the Green River
valley.
`
}
];

landmarks.SouthPass.talks=[
  {
    speaker:"A Mormon traveler",
    speech:
`
My family and I travel with 40 other families to the valley of the Great Salt
Lake to seek religious freedom.  Back east, Mormons are persecuted.  In Utah,
we'll join together to build a new community, changing desert into farm land.
`
},
{
  speaker:"An Arapaho Indian",
  speech:
  `
When the white man first crossed our lands their wagons were few.  Now they
crowd the trail in great numbers.  The land is overgrazed with their many
animals.  Do any white men still live in the East?  My people talk of moving.
`},
{
  speaker:"A young girl",
  speech:
  `
My father is very sick and we are resting here until he gets better.  We have
been pushing too hard and our health has suffered.  When my father is able to
travel again, we will go at a slower pace.
`}
];
landmarks.FortBridger.talks=[
  {
    speaker:"A tired-looking woman",
    speech:
`
One child drowned in a swollen creek east of Fort Laramie.  My husband died of
typhoid near Independence Rock.  Now I travel alone with my five children.
The eldest, Caleb, is eleven.  I fear he'll be a man before we reach Oregon.
`
},
{
  speaker:"A trader",
  speech:
  `
This fort was built by Jim Bridger.  Jim was a mountain man before he put in
this blacksmith shop and small store to supply the overlanders.  Does a big
trade in horses, Jim and his partner, Vasquez.
`},
{
  speaker:"Aunt Rebecca",
  speech:
  `
We should've taken the Sublette Cutoff!  Not enough at this fort worth the
time it took to get here.  And the outrageous prices!  Food's not fit to eat,
much less pay for.  Some folks'd sell the clothes off our backs if we'd let
them!
`}
];
landmarks.GreenRiverCrossing.talks=[
  {
    speaker:"A Shoshoni Indian",
    speech:
`
When wagons first started coming through here, we did not mind.  We even found
it good to trade game and fish with the travelers and help them cross the
rivers.  Now there are too many white men and too little land for grazing.
`},
{
  speaker:"Big Louie",
  speech:
`
Five dollars to ferry us over the Green River?  Those ferrymen'll make a
hundred dollars before breakfast!  We'll keep down river until we find a place
to ford our wagon and animals.  What little money we have left, we'll keep!
`},
{
  speaker:"A young boy",
  speech:
  `
My family didn't buy enough food in Independence.  We have been eating very
small rations since Fort Laramie.  Because of that our health is poor.  My
sister has mountain fever, so we're stopped here for a while.
`}
];

landmarks.SodaSprings.talks=[
  {
    speaker:"Miles Hendricks",
    speech:
`
I've heard it said that there are many cutoffs to take to shorten the journey
--that by taking all the shortcuts, you can save many days on the trail.  And
why not?  Saving time and provisions is worth the risk!
`
},
{
  speaker:"Celinda Hines",
  speech:
  `
My, the Soda Springs are so pretty!  Seem to spout at regular intervals.  Felt
good to just rest and not be jostled in the wagon all day.  When I get to
Oregon, I'll have a soft feather bed and never sleep in a wagon again!
`
},
{
  speaker:"A young boy",
  speech:
  `
My job every day is to find wood for the cook fire.  Sometimes it's very hard
to find enough, so I store extra pieces in a box under the wagon.  On the
prairie I gathered buffalo chips to burn when there wasn't any wood.
`
}
];
landmarks.FortHall.talks=[
  {
    speaker:"Miles Hendricks",
    speech:
`
Well, friend, this is where we part.  I'm bound for California with an
imposing desert to cross.  And you--you've got the Snake River to cross,
which I hear is no picnic!  Write us, you or the Missus, just as soon as you
reach Oregon!
`
},
{
  speaker:"Aunt Rebecca",
  speech:
  `
Hear there's mountain sheep around here.  Enough water too, but hardly a stick
of wood.  Thank heaven for Fort Hall!  But I'm real sorry to be saying goodbye
to cousin Miles and all the folks heading for California.
`},
{
  speaker:"A fellow traveler",
  speech:
  `
Fort Hall is a busy fort!  The wide stretches of meadow grass here are just
what our tired animals need.  As for me, I'll fix up the wagon leaks.
Amanda's real anxious to wash all the clothes and linens in one of those clear
streams.
`}
];

landmarks.SnakeRiverCrossing.talks=[
  {
    speaker:"A frantic wife",
    speech:
`
It says right here in the Shively guidebook: "You must hire an Indian to pilot
you at the crossings of the Snake river, it being dangerous if not perfectly
understood."  But my husband insists on crossing without a guide!
`
},
{
  speaker:"An overlander",
  speech:
  `
Down there between those steep lava gorges, twisting and writhing, is the Snake
River.  So much water--and so hard to get to!
We've got many miles of desert before Oregon, so be sure to fill your water
kegs at the crossing!
`
},
{
  speaker:"Big Louie",
  speech:
  `
See that wild river?  That's the Snake.  Many a craft's been swamped in her
foaming rapids.  Her waters travel all the way to Oregon!  We'll be crossing
her soon, and then again after Fort Boise.  Take care at the crossing!
`}
];

landmarks.FortBoise.talks=[
  {
    speaker:"A trader with 6 mules",
    speech:
`
You'll not get yer wagon over them Blue Mountains, mister.  Leave it!  Cross
yer goods over with pack animals.  Get yerself a couple of good mules.  Pieces
of wagons litter the trail--left by them folks who don't heed good advice!
`},
{
  speaker:"Aunt Rebecca",
  speech:
  `
At every fort along the trail, prices have been higher than at the previous
fort!  This is outrageous!  They're taking advantage of us!  If I had the
chance to do it again, I'd buy more supplies in Independence.
`},
{
  speaker:"Jacob Hofsteader",
  speech:
  `
Every night, even though I ache from the day's toils, my head is filled with
dreams of the rich farm land of the Willamette Valley.  I will build myself a
fine, handsome homestead--and I'm certain I'll be rich within five years.
`}
];
landmarks.BlueMountains.talks=[
  {
    speaker:"A tired overlander",
    speech:
`
Since crossing the Snake at Fort Boise, it's been just mountains and desert.
Dust deeper each day--six inches at times.  No tracks, just clouds of dust.
Many cattle choked on the dust after swimming the river, then bled and died.
`
},
{
  speaker:"Marnie Stewart",
  speech:
  `
We followed the edge of the desert from Fort Boise to the forbidding wall of
the Blue Mountains.  The hills were dreadful steep!  Locking both wheels and
coming down slow, we got down safe.  Poor animals!  No grass or water for days.
`},
{
  speaker:"Jacob Hofsteader",
  speech:
  `
This valley of the Grande Ronde is the most beautiful sight I've seen in
months.  Water and graze in abundance!  And if this valley is so fine, the
Willamette must be twice as fine!  We'll be sittin' pretty in our new
homestead!
`}
];

landmarks.FortWallaWalla.talks=[
  {
    speaker:"A young mother",
    speech:
`
I've traveled in fear of Indians since our journey began.  As of yet we've
seen few.  Those we met helped us cross rivers or sold us vegetables.  Still I
fear.  I've read grave markers and heard stories of killings in these
mountains.
`
},
{
  speaker:"Amy Witherspoon",
  speech:
  `
My cousin Catherine was one of six children orphaned and left at Whitman's
Mission.  Lived with them for three years--until the massacre last November.
She has survived snakebites, stampedes, falls, fights--not to mention a
massacre.
`
},
{
  speaker:"A Cayuse Indian",
  speech:
  `
You ask about the Whitman massacre.  I ask you why Doctor Whitman's medicine
did not cure my people's children?  Many caught the measles from the
strangers.  Why did the medicine poison our children and cure the children of
white people?
`}
];
landmarks.TheDalles.talks=[
  {
    speaker:"A mountain man",
    speech:
`
These last hundred miles to the Willamette Valley are the roughest--either
rafting down the swift and turbulent Columbia River or driving your wagon over
the steep Cascade Mountains.  Hire an Indian guide if you take the river.
`
},
{
  speaker:"Amy Witherspoon",
  speech:
  `
My cousin Lydia engaged passage down the Columbia with Indians--a canoe with
17 people and luggage!  The wind blew so heavy they had to lay by.  Near dark,
high waves came up over their heads!  Finally, they made it to shore safely.
`
},
{
  speaker:"A toll collector",
  speech:
  `
I collect the tolls for the Barlow Road--a bargain at twice the price!
Until last year the overlander had no choice--everyone floated the
Columbia.  Now with Mr. Barlow's new road, you can drive your wagon right into
Oregon City!
`}
];
landmarks.Unknown=landmarks.Unknown||{}; //I do not know where this talks belong to
landmarks.Unknown.talks=[
  {
    speaker:"unknown",
    speech:
`
We tried floating our wagon across the Kansas when the river was high.  The
wagon overturned in the middle of the river and we lost everything we had.
But we're not giving up!  We'll be back and try again.
`
},
{
  speaker:"unknown",
  speech:
  `
Check your supplies often.  If you are near to running out of essentials, you
can usually buy more at the forts.  If you have no money, you might be able to
trade with other travelers for what you need.  Don't wait until too late!
`},
{
  speaker:"unknown",
  speech:
  `
My brother went overland to Oregon last year.  He wrote and said that he spent
all his money in Independence.  He had no money left for buying supplies along
the way, for paying ferries and tolls, or for hiring Indian guides.`
}
];
