#!/bin/bash

for i in {01..30}
do
	name="TEST-${i}"
	
echo "---
title: $name
category: Technology
---
# Hello Test" > "${name}.md"
done

echo "Tamamlandı."
