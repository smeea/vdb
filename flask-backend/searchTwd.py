from searchTwdComponents import get_twd_by_location
from searchTwdComponents import get_twd_by_player
from searchTwdComponents import get_twd_by_players
from searchTwdComponents import get_twd_by_crypt
from searchTwdComponents import get_twd_by_library
from searchTwdComponents import get_twd_by_date
from searchTwdComponents import get_twd_by_traits
from searchTwdComponents import get_twd_by_event
from searchTwdComponents import get_twd_by_clan
from searchTwdComponents import get_twd_by_disciplines
from searchTwdComponents import get_overall_twd


def searchTwd(request):
    match_by_category = []
    good_twd = []
    parameters = 0

    try:
        if request.json['player']:
            parameters += 1
            match_by_category.append(get_twd_by_player(request.json['player']))
    except KeyError:
        pass

    try:
        if request.json['location']:
            parameters += 1
            match_by_category.append(get_twd_by_location(request.json['location']))
    except KeyError:
        pass


    try:
        if 'playersFrom' in request.json or 'playersTo' in request.json:
            players_from = 0;
            players_to = 1000;
            if 'playersFrom' in request.json:
                players_from = int(request.json['playersFrom'])
            if 'playersTo' in request.json:
                players_to = int(request.json['playersTo'])

            parameters += 1
            match_by_category.append(get_twd_by_players(players_from, players_to))

    except KeyError:
        pass

    try:
        if 'dateFrom' in request.json or 'dateTo' in request.json:
            date_from = 1997;
            date_to = 2077;
            if 'dateFrom' in request.json:
                date_from = int(request.json['dateFrom'])
            if 'dateTo' in request.json:
                date_to = int(request.json['dateTo'])

            parameters += 1
            match_by_category.append(get_twd_by_date(date_from, date_to))

    except KeyError:
        pass

    try:
        if request.json['crypt']:
            parameters += 1
            match_by_category.append(get_twd_by_crypt(request.json['crypt']))
    except KeyError:
        pass

    try:
        if request.json['library']:
            parameters += 1
            match_by_category.append(get_twd_by_library(request.json['library']))
    except KeyError:
        pass

    try:
        if request.json['clan']:
            parameters += 1
            match_by_category.append(get_twd_by_clan(request.json['clan']))
    except KeyError:
        pass

    try:
        if request.json['disciplines']:
            parameters += 1
            match_by_category.append(get_twd_by_disciplines(request.json['disciplines']))
    except KeyError:
        pass


    try:
        if request.json['event']:
            parameters += 1
            match_by_category.append(get_twd_by_event(request.json['event']))
    except KeyError:
        pass

    try:
        if request.json['traits']:
            parameters += 1
            match_by_category.append(get_twd_by_traits(request.json['traits']))
    except KeyError:
        pass

    if parameters == 0:
        return 400
    else:
        good_twd = get_overall_twd(match_by_category)
        if good_twd:
            return good_twd
        else:
            return 400
