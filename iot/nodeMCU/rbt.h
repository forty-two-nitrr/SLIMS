#ifndef RBT_H
#define RBT_H

#include <stdbool.h>

#define MEMORY_INSUFFICIENT -999999
#define swap(x, y)			{char t = x; x = y; y = t;}

typedef struct {
	int id;
	int time;
	bool status;
} payload_t;

typedef enum {
  RED,
  BLACK
} nodeColor;

typedef struct rbNode {
  payload_t data;
  nodeColor color;
  struct rbNode *link[2];
} rbNode;

rbNode*		insertion	(rbNode *root, payload_t data);
rbNode*		deletion	(rbNode *root, payload_t data);


#endif
