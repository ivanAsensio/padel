package com.fic.udc.es.padel.dtos;
import static com.fic.udc.es.padel.dtos.UserConversor.toUserDtos;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fic.udc.es.padel.model.entities.Game;
import com.fic.udc.es.padel.model.entities.PadelSet;
import com.fic.udc.es.padel.model.entities.Team;

public class GameConversor {
	
	private GameConversor() {}
	
	public final static GameDetailsDto toGameDetails(Game game, Set<PadelSet> sets, Set<Team> teams) {
		ZonedDateTime initZdt = ZonedDateTime.of(game.getInitDate(), ZoneId.systemDefault());
		ZonedDateTime finalZdt = ZonedDateTime.of(game.getFinalDate(), ZoneId.systemDefault());

		return new GameDetailsDto(game.getGameId(), initZdt.toInstant().toEpochMilli(), 
				finalZdt.toInstant().toEpochMilli(), game.getMinimunLevel(), game.getMaximunLevel(),
				game.getField().getFieldId(), game.getGameType(), toUserDtos(new ArrayList<>(game.getGameUsers())), toSetDtos(sets), toTeamDtos(teams), game.getField().getName());
	}
	
	public final static Set<TeamDto> toTeamDtos(Set<Team> teams){
		Set<TeamDto> teamsDto = new HashSet<>();
		for(Team team : teams) {
			teamsDto.add(toTeamDto(team));
		}
		return teamsDto;
	}
	
	public final static TeamDto toTeamDto(Team team) {
		return new TeamDto(team.getTeamId(), team.getName(), toUserDtos(new ArrayList<>(team.getTeamUsers())), team.getResultMatch());
	}
	
	public final static Set<SetDto> toSetDtos(Set<PadelSet> sets){
		Set<SetDto> setsDto = new HashSet<>();
		for(PadelSet set : sets) {
			setsDto.add(toSetDto(set));
		}
		return setsDto;
	}
	
	public final static SetDto toSetDto(PadelSet set) {
		return new SetDto(set.getNumberSet(), set.getResult());
	}
	
	public final static Set<PadelSet> toSets(List<SetDto> sets){
		Set<PadelSet> setsDto = new HashSet<>();
		for(SetDto set : sets) {
			setsDto.add(toSet(set));
		}
		return setsDto;
	}
	
	public final static PadelSet toSet(SetDto set) {
		PadelSet newSet = new PadelSet();
		newSet.setNumberSet(set.getNumberSet());
		newSet.setResult(set.getResult());
		return newSet;
	}

}
