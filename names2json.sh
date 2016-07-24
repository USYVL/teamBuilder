#!/bin/sh
# should possibly do this as python and have it build the entire data object
id=1
age=7
while read line; do
  # need to get an age
  [ `expr $id '%' 12` -eq 0 ] && age=`expr $age + 1`
  idstr=`printf "%03d" "$id"`
  [ $age -le 15 ] && echo "{id:'$idstr',age:'$age',name:'$line'}," || echo "{id:'$idstr',name:'$line'},"
  id=`expr $id + 1`
done < names.list
