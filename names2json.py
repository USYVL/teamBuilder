#!/usr/bin/env python
# this script is basically a hack to build up some chunks of json for coaches
# and players from a list of names only
import json
kidsPerAge = 12
teamsPerDivision = 3
teamNum = 1
filename = './names.list'
dlist = []
coaches = []
o = []
class person(object):
    def __init__(self,name,uuid):
        self.name = name
        self.uuid = uuid
        #self.uuidstr = "%03d" % (uuid)

class division:
    def __init__(self,name,min = -1,max = -1):
        self.name = name;
        self.minAge = int(name.split('-')[0]) if min < 0 else min
        self.maxAge = int(name.split('-')[1]) if max < 0 else max
        self.people = []
    def myPrint(self):
        count = len(self.people)
        print 'Division:',self.name,self.minAge,self.maxAge,count
    def addPerson(self,person):
        self.people.append(person)
    def myDict(self):
        global teamNum
        startNum = teamNum
        players = []
        teams = []
        teamNum = teamNum+teamsPerDivision
        for teamn in range(startNum,teamNum):
            teams.append({'uuid': "%03d" % (teamn),'name':'Team-'+"%03d"%(teamn),'coaches':[],'players':[]})
        for player in self.people:
            players.append({'uuid':player.uuid,'age':player.age,'name':player.name})
        tDict = {}
        tDict['name'] = self.name
        tDict['teams'] = teams
        tDict['players'] = players
        return tDict

class coach(person):
    def __init__(self,name,uuid):
        super(self.__class__,self).__init__(name,uuid)

    def myPrint(self):
        print self.uuid,self.name
    def myJSON(self):
        print '{ "id" : "' + self.uuid + '","name" : "' + self.name + '"}'

class participant(person):
    def __init__(self,name,age,uuid):
        super(self.__class__,self).__init__(name,uuid)
        self.age = age

    def myPrint(self):
        print self.uuid,self.age,self.name

divisions = ['7-8','9-10','11-12','13-15']

#lines = f.readlines()
lines = open(filename).read().splitlines()
age=7
uuid=1
for line in lines:
    #(firstName,lastName) = line.split()
    #print 'firstName: '+firstName+', lastName: '+lastName
    if ( uuid % kidsPerAge ) == 0:
        age += 1
    uuidstr = "%03d" % (uuid)
    if age <= 15:
        o.append(participant(line,age,uuidstr))
    else:
        coaches.append({'uuid':uuidstr,'name':line})
    uuid += 1

# initialize divisions
for d in divisions:
    dlist.append(division(d))

#coaches = division('coaches',0,100)

# for de in dlist:
#     de.myPrint()

# sort thet various objects into the appropriate division
for oe in o:
    if oe.age > 15:
        coaches.addPerson(oe)
    for de in dlist:
        assigned = False
        if oe.age >= de.minAge and oe.age <= de.maxAge:
            assigned = True
            de.addPerson(oe)
            break
    if not assigned:
        coaches.addPerson(oe)

# need to build the divisions dict to convert into json
toJson = []
for de in dlist:
    toJson.append(de.myDict())

# this is enough for the coaches
text_file = open("data/coaches.json", "w")
text_file.write(json.dumps(coaches))
text_file.close()

# this is enough for the coaches
text_file = open("data/divisions.json", "w")
text_file.write(json.dumps(toJson))
text_file.close()

#print json.dumps(coaches)
# for coach in coaches:
#     coach.myJSON()
